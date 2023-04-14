/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(
    "ALTER TABLE public.notification_is_read DROP CONSTRAINT notification_is_read_notification_type_check"
  );
  return knex.raw(
    "ALTER TABLE public.notification_is_read ADD CONSTRAINT notification_is_read_notification_type_check CHECK ((notification_type = ANY (ARRAY['ReworkDocument'::text, 'Signing'::text, 'IncomeTask'::text, 'CompleteTask'::text, 'OnRegistration'::text, 'Approved'::text, 'Completed'::text, 'Rejected'::text, 'SignedOOPZ'::text])));"
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(
    "ALTER TABLE public.notification_is_read DROP CONSTRAINT notification_is_read_notification_type_check"
  );
  return knex.raw(
    "ALTER TABLE public.notification_is_read ADD CONSTRAINT notification_is_read_notification_type_check CHECK ((notification_type = ANY (ARRAY['ReworkDocument'::text, 'Signing'::text, 'IncomeTask'::text, 'OnRegistration'::text])));"
  );
};
