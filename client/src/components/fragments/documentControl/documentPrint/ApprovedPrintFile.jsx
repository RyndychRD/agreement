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
import { useGetDocumentTasksByDocumentQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentTaskApi";

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
  const {
    data: confirmedForSecondPageDocumentTask = [],
    isLoadingDocumentTasks,
  } = useGetDocumentTasksByDocumentQueryHook({
    isConfirmedForSecondPageOnly: true,
    isAddForeignTables: true,
    documentId,
  });

  useEffect(() => {
    setIsComponentLoaded(
      !(
        isLoadingDocument ||
        isLoadingDocumentValues ||
        isLoadingDocumentRoute ||
        isLoadingDocumentTasks
      )
    );
  }, [
    isLoadingDocument,
    isLoadingDocumentValues,
    isLoadingDocumentRoute,
    setIsComponentLoaded,
    isLoadingDocumentTasks,
  ]);

  if (!isComponentLoaded) return null;

  let deipDirector = "";

  const routeStepsTrs = routeSteps.map((route) => {
    deipDirector =
      route?.actual_signer.position_id === 14
        ? route?.actual_signer
        : deipDirector;
    return (
      <tr key={route.id} style={{ textAlign: "center" }}>
        <td>{route?.actual_signer?.position_name}</td>
        <td>{route?.document_signature_type?.name}</td>
        <td>{userNameMask(route?.actual_signer)}</td>
        <td>{renderDate(route?.sign_date, false)}</td>
      </tr>
    );
  });

  const lastConfirmedTask = confirmedForSecondPageDocumentTask[0];

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
        <div style={{ pageBreakAfter: "always" }} />
        <div
          style={{ marginLeft: "15px", marginRight: "15px", marginTop: "20px" }}
        >
          <h3 style={{ fontWeight: "bold", marginLeft: "50px" }}>Раздел II:</h3>
          <table border="1">
            <thead>
              <tr>
                <th rowSpan={2}>
                  <b>№ п/п</b>
                </th>
                <th rowSpan={2}>
                  <b>Наименование ТРУ</b>
                </th>
                <th rowSpan={2}>
                  <b>Полное наименование статьи в бюджете</b>
                </th>
                <th colSpan={2}>
                  <b>Сумма по бюджету, тыс. тенге</b>
                </th>
                <th colSpan={2}>
                  <b>Сумма по договору, тыс. тенге</b>
                </th>
              </tr>
              <tr>
                <th>
                  <b>без НДС</b>
                </th>
                <th>
                  <b>с НДС</b>
                </th>
                <th>
                  <b>без НДС</b>
                </th>
                <th>
                  <b>с НДС</b>
                </th>
              </tr>
              <tr>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td>1</td>
                <td>{document.name}</td>
                <td>
                  {lastConfirmedTask?.custom_fields.fullNameOfTheItemInBudget}
                </td>
                <td>{lastConfirmedTask?.custom_fields.budgetSumNoNDS}</td>
                <td>{lastConfirmedTask?.custom_fields.budgetSumWithNDS}</td>
                <td>{lastConfirmedTask?.custom_fields.contractSumNoNDS}</td>
                <td>{lastConfirmedTask?.custom_fields.contractSumWithNDS}</td>
              </tr>
            </tbody>
          </table>
          <div style={{ paddingTop: "20px", marginLeft: "10px" }}>
            <div style={{ marginBottom: "10px" }}>
              Сотрудник ДЭиП_______________ ФИО{" "}
              <span style={{ textDecoration: "underline" }}>
                {userNameMask(lastConfirmedTask?.executor)}
              </span>
            </div>
            <div style={{ marginBottom: "10px" }}>
              Директор ДЭиП_______________ ФИО{" "}
              <span style={{ textDecoration: "underline" }}>
                {userNameMask(deipDirector)}
              </span>
            </div>
            <div>
              Курс валюты на дату{" "}
              <span style={{ textDecoration: "underline" }}>
                {lastConfirmedTask?.custom_fields.exchangeRates}
              </span>{" "}
              тенге/рубли РФ, доллары США и т.д.
            </div>
          </div>
          <div style={{ paddingTop: "20px" }}>
            <h3 style={{ fontWeight: "bold", marginLeft: "50px" }}>
              Примечание:
            </h3>
            <div
              style={{
                marginLeft: "50px",
                marginRight: "50px",
                textAlign: "start",
                width: "700px",
                textDecoration: "underline",
              }}
            >
              {lastConfirmedTask?.custom_fields.remark}
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
