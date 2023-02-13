import { useEffect } from "react";
import QRCode from "qrcode.react";
import {
  useGetDocumentRouteQueryHook,
  useGetDocumentQueryHook,
  useGetDocumentValuesQueryHook,
} from "../../../../core/redux/api/DocumentControl/DocumentApi";
import "./print.css";
import DocumentValuesService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentValuesService";
import { userNameMask } from "../../../../services/CommonFunctions";
import { renderDate } from "../../tables/CommonFunctions";

function getDocumentHeader(document, documentValues) {
  const documentValuesDivs = documentValues.map((documentValue) => {
    const preparedDocValue =
      DocumentValuesService.getValueAndLabelFromDocumentValue(documentValue);
    return (
      <div key={documentValue.id} style={{ marginBottom: "10px" }}>
        <span>
          <b>{`${preparedDocValue.label}`}</b>:{`${preparedDocValue.value}`}
        </span>
      </div>
    );
  });
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <b>Наименование договора:</b> {document.name}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <b>Тип договора:</b> {document.document_type_name}
      </div>
      {documentValuesDivs}
    </>
  );
}

function getQrCode(document, documentValues) {
  const documentValuesString = documentValues.map((documentValue) => {
    const preparedDocValue =
      DocumentValuesService.getValueAndLabelFromDocumentValue(documentValue);
    return `${preparedDocValue.label} : ${preparedDocValue.value}`;
  });
  const htmlValueArray = [
    `Наименование договора: ${document.name}`,
    `Тип договора: ${document.document_type_name}`,
  ].concat(documentValuesString);
  return (
    <QRCode
      style={{ width: "250px", height: "250px" }}
      value={htmlValueArray.join(" | ")}
    />
  );
}

export default function ApprovedPrintFile(props) {
  const { documentId, isStart, setIsComponentLoaded, isComponentLoaded } =
    props;

  const { data: document = {}, isLoading: isLoadingDocument } =
    useGetDocumentQueryHook({
      isStart,
      id: documentId,
      isAddForeignTables: true,
    });

  const { data: documentValues = {}, isLoading: isLoadingDocumentValues } =
    useGetDocumentValuesQueryHook({
      isStart,
      documentId,
      isGetConnectedTables: true,
    });

  const { data: routeSteps = {}, isLoading: isLoadingDocumentRoute } =
    useGetDocumentRouteQueryHook({
      documentId,
      isStart,
    });

  useEffect(() => {
    setIsComponentLoaded(
      !(isLoadingDocument || isLoadingDocumentValues || isLoadingDocumentRoute)
    );
  }, [
    isLoadingDocument,
    isLoadingDocumentValues,
    isLoadingDocumentRoute,
    setIsComponentLoaded,
  ]);

  if (!isComponentLoaded) return null;

  const routeStepsTrs = routeSteps.map((route) => (
    <tr key={route.id} style={{ textAlign: "center" }}>
      <td>{route?.actual_signer?.position_name}</td>
      <td>{route?.document_signature_type?.name}</td>
      <td>{userNameMask(route?.actual_signer)}</td>
      <td>{renderDate(route?.sign_date, false)}</td>
    </tr>
  ));

  return (
    <div>
      <div className="page">
        <div style={{ paddingLeft: "25px", paddingRight: "30px" }}>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <h2>
              <b>ЛИСТ СОГЛАСОВАНИЯ</b>
            </h2>
            <b>к договору No_____________ от ____________ 2023г.</b>
          </div>
          {getDocumentHeader(document, documentValues)}
          <div className="subpagepage">
            <div style={{ marginTop: "30px" }}>
              <table border="1">
                <thead>
                  <tr>
                    <th>
                      <b>Наименование должности (под-разделения)</b>
                    </th>
                    <th>
                      <b>
                        -согласовано; - не согласова-но; - согласовано с
                        замечаниями
                      </b>
                    </th>
                    <th>
                      <b>Расшифровка подписи</b>
                    </th>
                    <th>
                      <b>Дата согласования</b>
                    </th>
                  </tr>
                </thead>
                <tbody>{routeStepsTrs}</tbody>
              </table>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <b>Исполнитель:</b> {document.creator.position_name},{" "}
              {userNameMask(document.creator)} <br />
              <b>Телефоны исполнителя:</b> _________________ <br />
              <b>Полученный сторонами оригинал договора получен:</b>{" "}
              _________________
            </div>
          </div>
        </div>
        <div className="qr-container">
          {getQrCode(document, documentValues)}
        </div>
      </div>
    </div>
  );
}
