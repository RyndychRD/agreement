/* cSpell:disable */

const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.usersSeed = async function (knex) {
  // prettier-ignore
  const arr=[
    {id: 1,login: "admin",password: "$2a$10$0VTlc3KW9Tj7gHXJ7G5DuewLtCKR361hYk4x.bKWsFh5Gj87DjZLm",position_id: 19,last_name: "test",first_name: "",middle_name: "",email: "RyndychRD@zik.kz",},
    {id: 3,login: "NeboginAA",password: "$2a$10$fDkssu7LDK0xosWUqhvXpeuqSswwQDC2HqpdbWtFytzM4NZz8l1Ou",position_id: 8,last_name: "Небогин",first_name: "А",middle_name: "А",email: "NeboginAA@zik.kz",},
    {id: 8,login: "RakhmetovaAB",password: "$2a$10$4fU8YYv3eLCdntkAFguFjOBa/4fDBTgqKFVfDtSK6UnFsZ6tpNz0G",position_id: 13,last_name: "Рахметова",first_name: "А",middle_name: "Б",email: "RakhmetovaAB@zik.kz",},
    {id: 10,login: "ZhakupovaAA",password: "$2a$10$6cPoKrFcr.AP5kHRNAmJc.qyiDWNY.RG.U6KxdJ70UQHWJo4oNf9m",position_id: 22,last_name: "Жакупова",first_name: "А",middle_name: "А",email: "ZhakupovaAA@zik.kz",},
    {id: 12,login: "SafonovAV",password: "$2a$10$Vo9Qd9guSqxs0JDvxixfju/gVW2n2i0BeTzdUOlThQCcVHRerEiSm",position_id: 7,last_name: "Сафонов",first_name: "А",middle_name: "В",email: "SafonovAV@zik.kz",},
    {id: 14,login: "KozhemyakinNP",password: "$2a$10$pjH1r3sta.dblk0YSAIf0.WSbZ59oHUYIvvs9EC66U3I.vLVbj3qC",position_id: 4,last_name: "Кожемякин",first_name: "Н",middle_name: "П",email: "KozhemyakinNP@zik.kz",},
    {id: 16,login: "BorisovDB",password: "$2a$10$dx4hH6lzncqGYXbdmXoDquNQjWQibD1m8gVJcDetA/4z68Dk.l6Py",position_id: 60,last_name: "Борисов",first_name: "Д",middle_name: "Б",email: "BorisovDB@zik.kz",},
    {id: 18,login: "IssatovaNZ",password: "$2a$10$UOHcZqY7lK82hbH8Hdee2eF3F014YBQ50iv.zxWMj5670hBnTMs96",position_id: 9,last_name: "Исатова",first_name: "Н",middle_name: "Ж",email: "IssatovaNZ@zik.kz",},
    {id: 23,login: "LevchenkoSN",password: "$2a$10$FWFLQ89rMQUvV6tTJjqGWe8OMnMK7jmhObwc8wh1ce63IG/4RjzLi",position_id: 11,last_name: "Левченко",first_name: "С",middle_name: "Н",email: "LevchenkoSN@zik.kz",},
    {id: 25,login: "SabyrovAT",password: "$2a$10$foXajnbXcHTmU6etoNnyJ.AFpgn/cChXc5Y7ChUnxwtJMvG31Qpm.",position_id: 5,last_name: "Сабыров",first_name: "А",middle_name: "Т",email: "SabyrovAT@zik.kz",},
    {id: 27,login: "KamaliyevaSS",password: "$2a$10$w.a/8GTjX90irYmOsXPPJ.Bxan/EfYoQYHYzEzKri/fvEcHSrRyMK",position_id: 59,last_name: "Камалиева",first_name: "С",middle_name: "С",email: "KamaliyevaSS@zik.kz",},
    {id: 29,login: "MikheyevaSA",password: "$2a$10$ZOAX32CQ4/Ip6SDESGkiuuWNClBe5IDf0KAi3owyX8YvRbpiWdyhi",position_id: 14,last_name: "Михеева",first_name: "С",middle_name: "А",email: "MikheyevaSA@zik.kz",},
    {id: 31,login: "ErmakovaOI",password: "$2a$10$Wh31woqNp0XdDyCmwFcSSOtwCryy9o4jU2wZj1G8xBKyrkGJELIfC",position_id: 37,last_name: "Ермакова",first_name: "О",middle_name: "И",email: "ErmakovaOI@zik.kz",},
    {id: 35,login: "LyssenkoSP",password: "$2a$10$sbg/Lb7Pi04vu6z5aiHQQeXplDwN8nR41js0Bc3LzuELLMlT6mKoS",position_id: 16,last_name: "Лысенко",first_name: "С",middle_name: "П",email: "LyssenkoSP@zik.kz",},
    {id: 37,login: "BurakovaVA",password: "$2a$10$LIHNyKa2ko/PLUVNObgdBefDoLekN3Ze.9FkQcWuLbxg0iH2/PRRm",position_id: 17,last_name: "Буракова",first_name: "В",middle_name: "А",email: "BurakovaVA@zik.kz",},
    {id: 39,login: "SaromotinaAA",password: "$2a$10$yGos//3ecvrDziXUCwA7NuH3Y9YzAFqNwRR7pcp38TX5BvzQPkoZ6",position_id: 18,last_name: "Саромотина",first_name: "А",middle_name: "А",email: "SaromotinaAA@zik.kz",},
    {id: 41,login: "KhoroshenkoAA",password: "$2a$10$fdePml2fr5sMSnJXeTVVgOarvo1tLGvUk4CTd3N1vK6bG2QlQp8Uy",position_id: 19,last_name: "Хорошенко",first_name: "А",middle_name: "А",email: "KhoroshenkoAA@zik.kz",},
    {id: 43,login: "BakeyevAS",password: "$2a$10$stIBK.TJsBgNpEBvnoLs2Oo3vdi0vRlmZcdnY4159lXxvfp3SYqLK",position_id: 20,last_name: "Бакеев",first_name: "А",middle_name: "С",email: "BakeyevAS@zik.kz",},
    {id: 45,login: "YefremovAS",password: "$2a$10$7QBQ5m6OH.hHho4iQgriT.wKefIHxOyiugUrDGwT/UScDk4Z7ga5O",position_id: 21,last_name: "Ефремов",first_name: "А",middle_name: "С",email: "YefremovAS@zik.kz",},
    {id: 49,login: "AbilovAD",password: "$2a$10$cuSu92/WGKVVkKGoJmYF4OykQOL35FJdCV32pWKtWpA7r2H4z9js.",position_id: 23,last_name: "Абилов",first_name: "А",middle_name: "Д",email: "AbilovAD@zik.kz",},
    {id: 51,login: "BralinZA",password: "$2a$10$xa7pr4hNOjWl7rdWz8sOp.vsk.oPbiJKxE2kxdsXtmEaO2432MMvO",position_id: 61,last_name: "Бралин",first_name: "Ж",middle_name: "А",email: "BralinZA@zik.kz",},
    {id: 53,login: "VolovikAV",password: "$2a$10$JFRXSYXj4YVKdiqr3Toqr.JL9EtmBsh98DwTGRXgPbo2MCrY4jMi.",position_id: 25,last_name: "Воловик",first_name: "А",middle_name: "В",email: "VolovikAV@zik.kz",},
    {id: 57,login: "KorobeinikovaVV",password: "$2a$10$Uhu0xlYkmB6MJ8NTCKEvGeCiehEnQG8tnOTMR5/MYGr7chJ56Fpfm",position_id: 23,last_name: "Коробейникова",first_name: "В",middle_name: "В",email: "KorobeinikovaVV@zik.kz",},
    {id: 59,login: "KurmangozhinaZR",password: "$2a$10$I0eT3S6idYzi1Bn3yDzl6e/s4Rldbr.jkZUuwpaDwH5vZ2Ptygx2K",position_id: 26,last_name: "Курмангожина",first_name: "Ж",middle_name: "Р",email: "KurmangozhinaZR@zik.kz",},
    {id: 61,login: "MerzhvinskayaAS",password: "$2a$10$19Z6YFe/BfdIKh7Y27k5COBzFWJBL0pJO/dy6UfSX0VeW5.Okv8Ly",position_id: 23,last_name: "Мержвинская",first_name: "А",middle_name: "С",email: "MerzhvinskayaAS@zik.kz",},
    {id: 63,login: "MursalimovaAV",password: "$2a$10$xYcGTYBzKnDOduywLA7IYePnE2i/9CY0VztRh/09Dx04sY.gc2S9.",position_id: 27,last_name: "Мурсалимова",first_name: "А",middle_name: "В",email: "MursalimovaAV@zik.kz",},
    {id: 67,login: "PorotikovDI",password: "$2a$10$4bI.Iu8HQWEix0.x1I/ox.lnhvkmi9LHZZCzyAwxvnsjm/Wu2N.ze",position_id: 23,last_name: "Поротиков",first_name: "Д",middle_name: "И",email: "PorotikovDI@zik.kz",},
    {id: 69,login: "RamazanovKA",password: "$2a$10$1SpmacZ8HpPy5SRBVnDIPOpCKVNag3POh2NI.0IkO/3W4eZcESyIq",position_id: 23,last_name: "Рамазанов",first_name: "К",middle_name: "А",email: "RamazanovKA@zik.kz",},
    {id: 71,login: "RozhnovaKV",password: "$2a$10$1cfMSRDxAFXPTUy8qdlPkuuel9poISXRZDNznwluNC.Gz6y/G9Uh2",position_id: 28,last_name: "Рожнова",first_name: "К",middle_name: "В",email: "RozhnovaKV@zik.kz",},
    {id: 77,login: "KapashevMM",password: "$2a$10$ouWEaYEmsVAK47NehL6r0un2RtWeDdeEpnWgR/bi9.jQeX.L5RMCK",position_id: 30,last_name: "Капашев",first_name: "М",middle_name: "М",email: "KapashevMM@zik.kz",},
    {id: 79,login: "GabbassovDO",password: "$2a$10$hckhWxlxxRd0nb3h1Sl43eqmhu7cBec1rRhvM5ww3CAPsZPU4GxcW",position_id: 31,last_name: "Габбасов",first_name: "Д",middle_name: "О",email: "GabbassovDO@zik.kz",},
    {id: 81,login: "KossyakinaNV",password: "$2a$10$PUoxJvsteouYSrCbZwsT7eJ4SXUfgbP6/cCptQS75gRiKgVf.EWeq",position_id: 32,last_name: "Косякина",first_name: "Н",middle_name: "В",email: "KossyakinaNV@zik.kz",},
    {id: 83,login: "ShevelevaRE",password: "$2a$10$H7TmMlJIw/QaYaO5tR9WOun1JKnSrQnMin6HfxGO9rlEkJ6OfgYru",position_id: 33,last_name: "Шевелева",first_name: "Р",middle_name: "Е",email: "ShevelevaRE@zik.kz",},
    {id: 85,login: "ZubenkoNV",password: "$2a$10$lo.JFpaDf0Z/.twjsCLZNetYWtqbDenma4gbDBXcfXB/hhAMNfz06",position_id: 63,last_name: "Зубенко",first_name: "Н",middle_name: "В",email: "ZubenkoNV@zik.kz",},
    {id: 89,login: "AkmultykovaAN",password: "$2a$10$VcjHrDmEjSfiMJOf0BCIE.kSyO6GEwKl7AhjVU9L9cJY.Q1gg7lGG",position_id: 35,last_name: "Акмултыкова",first_name: "А",middle_name: "Н",email: "AkmultykovaAN@zik.kz",},
    {id: 91,login: "AubakirovEZ",password: "$2a$10$dVdpmk3uLA/u4sRS3Ef1aOZjNj86EWMcotjQgJ5B61NPAD0WQCdKW",position_id: 36,last_name: "Аубакиров",first_name: "Э",middle_name: "Ж",email: "AubakirovEZ@zik.kz",},
    {id: 95,login: "ZhaxybayevAD",password: "$2a$10$UQK8gqh5Cgtp4dv/kUEC/u9VucNkdJjzvad.C6HAVgKGvuTlwm7BK",position_id: 9,last_name: "Жаксыбаев",first_name: "А",middle_name: "Д",email: "ZhaxybayevAD@zik.kz",},
    {id: 99,login: "KabdoshZS",password: "$2a$10$hesF9tMjDwBi0iGlwsL98OGHQVwGgftuxu75V36OL7bpc0gARiJ7a",position_id: 9,last_name: "Кабдош",first_name: "Ж",middle_name: "С",email: "KabdoshZS@zik.kz",},
    {id: 101,login: "KalymtayevaAS",password: "$2a$10$9gFMZtLpzAMFIHFVH/gD9e1ogHIqTe.yaf.B/LBmU7gPTdGAvKX4e",position_id: 9,last_name: "Калымтаева",first_name: "А",middle_name: "С",email: "KalymtayevaAS@zik.kz",},
    {id: 103,login: "TimokhinaAD",password: "$2a$10$WvLPbW1zjoRgn94gVe0u5u0xZ1.PUdRfvYh81egny289ngVdkhKky",position_id: 9,last_name: "Тимохина",first_name: "А",middle_name: "Д",email: "TimokhinaAD@zik.kz",},
    {id: 105,login: "ShakirovaKK",password: "$2a$10$QccPzeziZO4CssXFdlCgqOd9n0Y65ErjbcwJqi2teKjb5XOgPPXC2",position_id: 9,last_name: "Шакирова",first_name: "К",middle_name: "К",email: "ShakirovaKK@zik.kz",},
    {id: 107,login: "KrivolapovAV",password: "$2a$10$M8UX0DYgf8TrQD7ZIXUb1u0L6Gr5uFC.Ddr3XHjwXFC7WIOQcdVje",position_id: 38,last_name: "Криволапов",first_name: "А",middle_name: "В",email: "KrivolapovAV@zik.kz",},
    {id: 109,login: "ArtyomovVN",password: "$2a$10$1SOfb1IPfyiq2zQel.nDwOM.xl6lYWQfU7.wM9i71uJ9Jxse/.KDK",position_id: 39,last_name: "Артёмов",first_name: "В",middle_name: "Н",email: "ArtyomovVN@zik.kz",},
    {id: 111,login: "OssipovaAA",password: "$2a$10$9eqiUur29Jur1jA/zyXdYeQdGQ6w8ToPLsxZMDjyYi/ZuxnUc1cui",position_id: 40,last_name: "Осипова",first_name: "А",middle_name: "А",email: "OssipovaAA@zik.kz",},
    {id: 113,login: "KadyrovDS",password: "$2a$10$a/5vySvFTSQiUd.wbnnHR.sLo/etub0GDj2CozOwckEJV4YbfeQ.S",position_id: 43,last_name: "Кадыров",first_name: "Д",middle_name: "С",email: "KadyrovDS@zik.kz",},
    {id: 115,login: "ZhenzheraLE",password: "$2a$10$B1rSswxBmX10/SdluXsgb.gnVdMPH1BvNUcXuvQ/B3I7V/szoVb9C",position_id: 42,last_name: "Женжера",first_name: "Леонид",middle_name: "Евгеньевич",email: "ZhenzheraLE@zik.kz",},
    {id: 119,login: "ImamovaAS",password: "$2a$10$lE1yUxSij9jjIUqrfJ9ed.7hurqO8VOwsez3VQ.FEG7ZLpumoi.bG",position_id: 44,last_name: "Имамова",first_name: "А",middle_name: "С",email: "ImamovaAS@zik.kz",},
    {id: 121,login: "MursalimovRR",password: "$2a$10$J17dTUNkAyB0bsBp/UB7SO93w8GU22R5wzy0Nn4mlInFKPcTQmKOy",position_id: 45,last_name: "Мурсалимов",first_name: "Р",middle_name: "Р",email: "MursalimovRR@zik.kz",},
    {id: 123,login: "ChistyakovIV",password: "$2a$10$Yn.HTMqoeAN4P2m/YNuaCexadf/Yow6LwusmrC7XZftuCRmEE4GHy",position_id: 46,last_name: "Чистяков",first_name: "И",middle_name: "В",email: "ChistyakovIV@zik.kz",},
    {id: 125,login: "BurakovMF",password: "$2a$10$odtwIZo9k7ksLBVbPqQPxucnNMPp2BC.IOc7YduB91CCVJJtkSULm",position_id: 47,last_name: "Бураков",first_name: "М",middle_name: "Ф",email: "BurakovMF@zik.kz",},
    {id: 127,login: "DyatlovDV",password: "$2a$10$20rE6wfuhUBGBHY2imY3KucZByNzXvn9AGFbPv2ght2MBP5BbN0zG",position_id: 49,last_name: "Дятлов",first_name: "Д",middle_name: "В",email: "DyatlovDV@zik.kz",},
    {id: 129,login: "TitovDI",password: "$2a$10$.lkKZxluHKKlTfEJpzmaZu4fU645nMNnV4/jlssSIeCZd40/l7bpe",position_id: 50,last_name: "Титов",first_name: "Д",middle_name: "И",email: "TitovDI@zik.kz",},
    {id: 131,login: "SabdinovTK",password: "$2a$10$/QXDdORI9wJsL2a5u8YGo.PqYvtsqd3BWsRD56bEUYwazpyCvvO.u",position_id: 51,last_name: "Сабдинов",first_name: "Т",middle_name: "К",email: "SabdinovTK@zik.kz",},
    {id: 133,login: "BasharovaIY",password: "$2a$10$368WGRwZYBjU0Xj2ULJxD.dMn4e3Y0Dchn0Fzx0qFIYdOR08f.LJi",position_id: 52,last_name: "Башарова",first_name: "И",middle_name: "У",email: "BasharovaIY@zik.kz",},
    {id: 135,login: "ShayakhmetovaNN",password: "$2a$10$ZxH7AUJaz219Bn8.O8hItuSiMu8Tw9kKanbZ2JHg0g9I27nIKCf9S",position_id: 53,last_name: "Шаяхметова",first_name: "Н",middle_name: "Н",email: "ShayakhmetovaNN@zik.kz",},
    {id: 137,login: "KrapivyanovMA",password: "$2a$10$1tvVkrXBcjqteW4XcLyHkOY3YC6Wh1Wa0t7tubbFTx6M4DAgCwiw.",position_id: 54,last_name: "Крапивьянов",first_name: "М",middle_name: "А",email: "KrapivyanovMA@zik.kz",},
    {id: 139,login: "KarmanovAA",password: "$2a$10$ubpkcYsmrMes0jG4mPPOpOjEmcxw6CfZ9P8hm5dlYb9FFzBqeQfyO",position_id: 54,last_name: "Карманов",first_name: "А",middle_name: "А",email: "KarmanovAA@zik.kz",},
    {id: 141,login: "KudryakovRO",password: "$2a$10$3wwR.bqPHm/.ryIEB/LoJuiTTDA/pLCIYF6vLXhNXbmpjizNfDyo6",position_id: 55,last_name: "Кудряков",first_name: "Р",middle_name: "О",email: "KudryakovRO@zik.kz",},
    {id: 143,login: "ReshetarAY",password: "$2a$10$XRTZTiuC36fG.EW7DCDJFOmV2pnwpd6I2Z81JNWPABPJqJFCdwftG",position_id: 56,last_name: "Решетар",first_name: "А",middle_name: "Ю",email: "ReshetarAY@zik.kz",},
    {id: 145,login: "MoiseenkoIA",password: "$2a$10$8pb/bU5txcKWqKmNbc7fN.jLfL1Upigk2/BSd25S6ZDvxUe8GTZCy",position_id: 57,last_name: "Моисеенко",first_name: "И",middle_name: "А",email: "MoiseenkoIA@zik.kz",},
    {id: 147,login: "EkimovIS",password: "$2a$10$3pwLhC1DQdjTuKzTp/lgieOcdRH8vFRIvLmj10LaYg8biDV8FlOrq",position_id: 58,last_name: "Екимов",first_name: "И",middle_name: "С",email: "EkimovIS@zik.kz",},
    {id: 149,login: "FilimonovMM",password: "$2a$10$P5zUyL8.gIjcATUk7xnuFOxLKVB4fo2qiZVQbq2Yz435C7WaO3eEW",position_id: 48,last_name: "Филимонов",first_name: "М",middle_name: "М",email: "FilimonovMM@zik.kz",},
    {id: 151,login: "DemidovaKA",password: "$2a$10$BisgL594pfWrb4.Paw8.dOjWo9DAnKMK1nGoamh.UmVkBY1QuujvC",position_id: 9,last_name: "Демидова",first_name: "К",middle_name: "А",email: "DemidovaKA@zik.kz",},
    {id: 152,login: "UmarovN",password: "$2a$10$BisgL594pfWrb4.Paw8.dOjWo9DAnKMK1nGoamh.UmVkBY1QuujvC",position_id: 9,last_name: "Умаров",first_name: "Н",middle_name: "",email: "UmarovN@zik.kz",},
    {id: 153,login: "UatayevaAK",password: "$2a$10$BisgL594pfWrb4.Paw8.dOjWo9DAnKMK1nGoamh.UmVkBY1QuujvC",position_id: 64,last_name: "Уатаева",first_name: "Айнура",middle_name: "",email: "UatayevaAK@zik.kz",},
  ]

  const table = "users";
  await seedTable(knex, {
    table: table,
    arr: arr,
    index: 153,
    isAddCheck: true,
  });
  console.log("usersSeed executed");
};
