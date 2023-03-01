/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { seedTable } = require("../../seedHelper/seedHelper");

function getItem(rightId, depId) {
  return { right_id: rightId, department_id: depId };
}

exports.departmentRightsSeed = async function (knex) {
  //Даем всем департаментам все права, кроме админских
  // prettier-ignore
  const arr=[
    getItem(2,1),	getItem(2,2),	getItem(2,3),	getItem(2,4),	getItem(2,5),	getItem(2,6),	getItem(2,7),	getItem(2,8),	getItem(2,9),	getItem(2,10),	getItem(2,11),	getItem(2,12),	getItem(2,13),	getItem(2,14),	getItem(2,15),	getItem(2,16),	getItem(2,17),	getItem(2,18),	getItem(2,20),	getItem(2,21),	getItem(2,22),	getItem(2,23),
    getItem(3,1),	getItem(3,2),	getItem(3,3),	getItem(3,4),	getItem(3,5),	getItem(3,6),	getItem(3,7),	getItem(3,8),	getItem(3,9),	getItem(3,10),	getItem(3,11),	getItem(3,12),	getItem(3,13),	getItem(3,14),	getItem(3,15),	getItem(3,16),	getItem(3,17),	getItem(3,18),	getItem(3,20),	getItem(3,21),	getItem(3,22),	getItem(3,23),
    getItem(4,1),	getItem(4,2),	getItem(4,3),	getItem(4,4),	getItem(4,5),	getItem(4,6),	getItem(4,7),	getItem(4,8),	getItem(4,9),	getItem(4,10),	getItem(4,11),	getItem(4,12),	getItem(4,13),	getItem(4,14),	getItem(4,15),	getItem(4,16),	getItem(4,17),	getItem(4,18),	getItem(4,20),	getItem(4,21),	getItem(4,22),	getItem(4,23),
    getItem(5,1),	getItem(5,2),	getItem(5,3),	getItem(5,4),	getItem(5,5),	getItem(5,6),	getItem(5,7),	getItem(5,8),	getItem(5,9),	getItem(5,10),	getItem(5,11),	getItem(5,12),	getItem(5,13),	getItem(5,14),	getItem(5,15),	getItem(5,16),	getItem(5,17),	getItem(5,18),	getItem(5,20),	getItem(5,21),	getItem(5,22),	getItem(5,23),
    getItem(6,1),	getItem(6,2),	getItem(6,3),	getItem(6,4),	getItem(6,5),	getItem(6,6),	getItem(6,7),	getItem(6,8),	getItem(6,9),	getItem(6,10),	getItem(6,11),	getItem(6,12),	getItem(6,13),	getItem(6,14),	getItem(6,15),	getItem(6,16),	getItem(6,17),	getItem(6,18),	getItem(6,20),	getItem(6,21),	getItem(6,22),	getItem(6,23),
    getItem(7,1),	getItem(7,2),	getItem(7,3),	getItem(7,4),	getItem(7,5),	getItem(7,6),	getItem(7,7),	getItem(7,8),	getItem(7,9),	getItem(7,10),	getItem(7,11),	getItem(7,12),	getItem(7,13),	getItem(7,14),	getItem(7,15),	getItem(7,16),	getItem(7,17),	getItem(7,18),	getItem(7,20),	getItem(7,21),	getItem(7,22),	getItem(7,23),
    getItem(8,1),	getItem(8,2),	getItem(8,3),	getItem(8,4),	getItem(8,5),	getItem(8,6),	getItem(8,7),	getItem(8,8),	getItem(8,9),	getItem(8,10),	getItem(8,11),	getItem(8,12),	getItem(8,13),	getItem(8,14),	getItem(8,15),	getItem(8,16),	getItem(8,17),	getItem(8,18),	getItem(8,20),	getItem(8,21),	getItem(8,22),	getItem(8,23),
    getItem(9,1),	getItem(9,2),	getItem(9,3),	getItem(9,4),	getItem(9,5),	getItem(9,6),	getItem(9,7),	getItem(9,8),	getItem(9,9),	getItem(9,10),	getItem(9,11),	getItem(9,12),	getItem(9,13),	getItem(9,14),	getItem(9,15),	getItem(9,16),	getItem(9,17),	getItem(9,18),	getItem(9,20),	getItem(9,21),	getItem(9,22),	getItem(9,23),
    getItem(10,1),	getItem(10,2),	getItem(10,3),	getItem(10,4),	getItem(10,5),	getItem(10,6),	getItem(10,7),	getItem(10,8),	getItem(10,9),	getItem(10,10),	getItem(10,11),	getItem(10,12),	getItem(10,13),	getItem(10,14),	getItem(10,15),	getItem(10,16),	getItem(10,17),	getItem(10,18),	getItem(10,20),	getItem(10,21),	getItem(10,22),	getItem(10,23),
    getItem(11,1),	getItem(11,2),	getItem(11,3),	getItem(11,4),	getItem(11,5),	getItem(11,6),	getItem(11,7),	getItem(11,8),	getItem(11,9),	getItem(11,10),	getItem(11,11),	getItem(11,12),	getItem(11,13),	getItem(11,14),	getItem(11,15),	getItem(11,16),	getItem(11,17),	getItem(11,18),	getItem(11,20),	getItem(11,21),	getItem(11,22),	getItem(11,23),
    getItem(12,1),	getItem(12,2),	getItem(12,3),	getItem(12,4),	getItem(12,5),	getItem(12,6),	getItem(12,7),	getItem(12,8),	getItem(12,9),	getItem(12,10),	getItem(12,11),	getItem(12,12),	getItem(12,13),	getItem(12,14),	getItem(12,15),	getItem(12,16),	getItem(12,17),	getItem(12,18),	getItem(12,20),	getItem(12,21),	getItem(12,22),	getItem(12,23),
    getItem(13,1),	getItem(13,2),	getItem(13,3),	getItem(13,4),	getItem(13,5),	getItem(13,6),	getItem(13,7),	getItem(13,8),	getItem(13,9),	getItem(13,10),	getItem(13,11),	getItem(13,12),	getItem(13,13),	getItem(13,14),	getItem(13,15),	getItem(13,16),	getItem(13,17),	getItem(13,18),	getItem(13,20),	getItem(13,21),	getItem(13,22),	getItem(13,23),
    
  ]
  const table = "departments-rights";

  await seedTable(knex, {
    table: table,
    arr: arr,
    index: 1,
    isAddCheck: true,
  });

  console.log("departmentRightsSeed executed");
};
