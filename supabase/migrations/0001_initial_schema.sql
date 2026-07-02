-- ============================================================================
-- 14_Supabase_SQL.sql  —  Diamondback Insurance PostgreSQL / Supabase schema
-- Generated from the Bubble export. Enum full set in 09_Option_Sets.md.
-- NOTE: enums whose Bubble db_value was an opaque internal id have been re-slugged
-- from the option display name. Verify against business terminology before use.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---- Core enum types ----
do $$ begin create type role_enum as enum ('master_admin', 'mtm_admin', 'agency_admin', 'agent', 'insured'); exception when duplicate_object then null; end $$;
do $$ begin create type quote_status_enum as enum ('all_active', 'generated', 'sent_to_customer', 'in_progress', 'waiting_on_broker', 'underwriting', 'bound', 'follow_up', 'declined_by_diamondback', 'declined_by_mtm', 'deleted_hidden', 'special_offer', 'deleted_special_offer'); exception when duplicate_object then null; end $$;
do $$ begin create type policy_status_enum as enum ('effective', 'not_effective', 'cancelled'); exception when duplicate_object then null; end $$;
do $$ begin create type proposal_status_enum as enum ('entry', 'quoted', 'underwriting', 'waiting_for_payment', 'bound', 'issued', 'expiry', 'rejected'); exception when duplicate_object then null; end $$;
do $$ begin create type background_task_enum as enum ('agencies_details', 'users_details', 'quotes_details', 'policies_details', 'prospect_details', 'insureds_details', 'user_roles', 'agencies', 'users', 'quotes', 'policies', 'prospect', 'insureds'); exception when duplicate_object then null; end $$;
do $$ begin create type address_type_enum as enum ('physical', 'mailing', 'garaging', 'home', 'office'); exception when duplicate_object then null; end $$;
do $$ begin create type phone_type_enum as enum ('agency_primary', 'mobile_cell', 'office', 'fax', 'support', 'home', 'applicant'); exception when duplicate_object then null; end $$;
do $$ begin create type email_type_enum as enum ('insured_primary', 'office', 'support', 'bussiness', 'applicant'); exception when duplicate_object then null; end $$;
do $$ begin create type person_type_enum as enum ('owner', 'agent', 'insured', 'prospect', 'driver', 'applicant'); exception when duplicate_object then null; end $$;
do $$ begin create type scheduled_status_enum as enum ('scheduled', 'not_scheduled', 'waiting_on_approval'); exception when duplicate_object then null; end $$;
do $$ begin create type agency_status_enum as enum ('all', 'allowed', 'denied'); exception when duplicate_object then null; end $$;

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_name text,
  first_name text,
  first_last_name text,
  user_details_id text,
  profile_picture text,
  current_role role_enum,
  has_right_to_use_portal boolean,
  user_details_link uuid references user_details(id)
);

create table if not exists app_settings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  name text,
  email text,
  logo_dark text,
  icon_dark text,
  airdev_project_id text,
  logo_light text,
  email_logo text,
  log_in_image text,
  seo_social_site_title text,
  icon_light text,
  sidebar_logo text,
  email_provider text,
  app_primary_color text,
  language_on boolean,
  usersnap_off boolean,
  seo_social_site_description text,
  localizejs_on boolean,
  "2fa_is_enabled" boolean,
  seo_social_site_image text,
  localizejs_script text,
  log_in_page_tagline text,
  "2fa_is_required" boolean,
  ask_for_cookies boolean,
  sidebar_base_color text,
  admin_portal_loads numeric,
  sidebar_alert_color text,
  admin_sidebar_show_setup boolean,
  log_in_page_font_color text,
  log_in_page_solid_color text,
  localizejs_project_key text,
  log_in_page_description text,
  sidebar_base_color_hue text,
  log_in_full_image_only boolean,
  log_in_page_background_type text,
  sidebar_default_gray_color text,
  language_default text   -- option: language,
  email_template_folders text[],
  account_deletion_on boolean,
  email_verification_required boolean,
  phone_verification_required boolean,
  sidebar_dark_hovered_tab_color text,
  sidebar_light_background_color text,
  admin_sidebar_show_app_data boolean,
  log_in_page_gradient_ending_color text,
  sidebar_dark_default_font_color text,
  sidebar_dark_hovered_font_color text,
  sidebar_dark_selected_tab_color text,
  sidebar_light_hovered_tab_color text,
  language_options text[]   -- option: language,
  sidebar_dark_selected_font_color text,
  sidebar_default_light_gray_color text,
  sidebar_icon_sidebar_portal_mode text,
  sidebar_light_default_font_color text,
  sidebar_light_hovered_font_color text,
  sidebar_light_selected_tab_color text,
  log_in_page_gradient_starting_color text,
  sidebar_light_selected_font_color text,
  sidebar_double_sidebar_portal_mode text,
  sidebar_slider_default_lightness numeric,
  sidebar_slider_default_saturation numeric,
  sidebar_standard_sidebar_portal_mode text,
  sidebar_dark_background_color_1_level text,
  sidebar_dark_background_color_2_level text,
  admin_sidebar_show_canvas_tools boolean,
  completed_admin_options text[]   -- option: admin_menu,
  password_minimum_accepted_strength text   -- option: ____password_strength
);

create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  city text,
  line1 text,
  line2 text,
  county text,
  zip_code text,
  current_quote_id text,
  state text   -- option: State_opt,
  address_type address_type_enum
);

create table if not exists phones (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  phone_number text,
  current_quote_id text,
  phone_type phone_type_enum
);

create table if not exists emails (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  email_address text,
  current_quote_id text,
  email_type email_type_enum
);

create table if not exists credentials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  password text,
  agency_id text,
  user_name text,
  user_type text,
  issue_date timestamptz,
  token_type text,
  user_email text,
  agency_name text,
  expire_date timestamptz,
  token_value text,
  display_name text,
  ams text   -- option: AMS_opt,
  refresh_token text
);

create table if not exists agencies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  agency_name text,
  agency_details_id text,
  agency_nowcerts_id text,
  ctive boolean,
  agency_details_link uuid references agency_details(id)
);

create table if not exists agency_details (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  website text,
  mtm_code text,
  agentpct numeric,
  users text[],
  retailpct numeric,
  agency_logo text,
  wholesalepct numeric,
  agency_main_link uuid references agencies(id),
  is_whole_sale boolean,
  address uuid references addresses(id)
);

create table if not exists user_details (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  user_main_link text
);

create table if not exists permissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  user_deleted text,
  email_deleted text,
  role_deleted role_enum,
  agency_deleted uuid references agencies(id),
  object text   -- option: Object_opt,
  acceptedinvite_deleted boolean,
  permissions text[]   -- option: Permissions_opt
);

create table if not exists user_roles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  user text,
  email text,
  role role_enum,
  agency uuid references agencies(id),
  accepted_invite boolean
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  dba text,
  name text,
  mc_number text,
  dot_number text,
  sort_email text,
  sort_phone text,
  sort_state text,
  owner_link uuid references persons(id),
  isnewventure boolean,
  current_quote_id text,
  sort_agency_name text,
  sort_owner_names text,
  address_link uuid references addresses(id),
  company_details_id text,
  years_owner_expirience numeric,
  year_established numeric,
  years_in_business numeric,
  carrier_type text   -- option: Carrier_types_opt,
  company_details_link uuid references company_details(id),
  legal_entity text   -- option: Legal_entities_opt
);

create table if not exists person_details (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  person_main_id text,
  current_quote_id text,
  person_main_link uuid references persons(id),
  total_number_violations numeric
);

create table if not exists persons (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  ssn text,
  age numeric,
  last_name text,
  first_name text,
  middle_name text,
  license_date timestamptz,
  date_of_birth timestamptz,
  license_number text,
  first_last_name text,
  current_quote_id text,
  number_in_list numeric,
  valid_license boolean,
  person_details_id text,
  policyelementid numeric,
  license_state_name_sort text,
  prefix text   -- option: Prefix_opt,
  suffix text   -- option: Suffix_opt,
  current_quote_link uuid references quotes(id),
  license_state text   -- option: State_opt,
  person_type text[]   -- option: Person_type_opt,
  license_class text   -- option: License_class_opt,
  person_details_link uuid references person_details(id),
  scheduled_status scheduled_status_enum
);

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  vin text,
  make_name text,
  model text,
  value numeric,
  custom_make boolean,
  team_driver boolean,
  year_of_make numeric,
  current_quote_id text,
  number_in_list numeric,
  policyelementid numeric,
  physical_damage_y_n boolean,
  calculated_physical_damage numeric,
  type_vehicle_opt text   -- option: Vehicle_type_opt,
  deductible text   -- option: Value_deductible_opt,
  operating_radius text   -- option: Operating_radius_opt,
  make_opt text   -- option: Vehicle_make_opt,
  scheduled_status scheduled_status_enum,
  physical_damage_ratio_of_vehicle text   -- option: Physical_damage_ratio_opt
);

create table if not exists violations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  current_quote_id text,
  number_of_this_violation numeric,
  driver_commited uuid references persons(id),
  violation_type text   -- option: Violations_opt
);

create table if not exists gcl (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  f_id numeric,
  limit_id numeric,
  limit_name text,
  state_id numeric,
  state_name text,
  coverage_id numeric,
  coverage_name text,
  coverage_group_name text,
  coverage_group_id text,
  limit_link text   -- option: Limit_opt,
  state_link text   -- option: State_opt,
  coverage_link text   -- option: Coverage_opt,
  coverage_group_link text   -- option: Coverage_Group_opt
);

create table if not exists prospects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  agency_id text,
  mc_number text,
  company_id text,
  dot_number text,
  current_quote_id text,
  address_link uuid references addresses(id),
  company_link uuid references companies(id),
  prospect_details_id text,
  agency_link uuid references agencies(id),
  prospect_details_link uuid references prospect_details(id)
);

create table if not exists prospect_details (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  insured_id text,
  current_quote_id text,
  prospect_main_id text,
  insured_link uuid references insureds(id),
  owner_is_driver boolean,
  prospect_main_link uuid references prospects(id)
);

create table if not exists insureds (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  agency_id text,
  company_id text,
  current_quote_id text,
  address_link uuid references addresses(id),
  company_link uuid references companies(id),
  insured_details_id text,
  agency_link uuid references agencies(id),
  insured_details_link uuid references insured_details(id)
);

create table if not exists insured_details (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  insured_main_id text,
  current_quote_id text,
  insured_main_link uuid references insureds(id),
  owner_is_driver boolean
);

create table if not exists fees (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  amount numeric,
  current_quote_id text,
  code text   -- option: Fee_Code_opt
);

create table if not exists taxes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  amount numeric,
  current_quote_id text,
  code text   -- option: Tax_Code_opt
);

create table if not exists premiums (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  name text,
  amount numeric,
  fee uuid references fees(id),
  tax uuid references taxes(id),
  premium_code text   -- option: Premium_Code_opt
);

create table if not exists endorsements (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  amount numeric,
  installment_date timestamptz,
  agency_commission numeric,
  installment_amount numeric,
  code text   -- option: Endorsement_Code_opt
);

create table if not exists coverage_limits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  mtm_code_id text,
  coverage_text text,
  quote_details_id text,
  limit text   -- option: Limit_opt,
  coverage_amount_1 numeric,
  coverage_amount_2 numeric,
  coverage_amount_3 numeric,
  coverage text   -- option: Coverage_opt,
  quote_details_link uuid references quote_details(id)
);

create table if not exists mtm_forms (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  dba text,
  date_signed timestamptz,
  dot numeric,
  e_mail text,
  sms_pin text,
  producer text,
  radius numeric,
  mc_number numeric,
  contact_name text,
  phone_number text,
  uiia_y_n boolean,
  agency_link uuid references agencies(id),
  applicant_s_name text,
  current_quote_id text,
  garaging_address text,
  target_effective timestamptz,
  updating_form boolean,
  company_link uuid references companies(id),
  target_premium numeric,
  terminals_y_n boolean,
  carrier_type_other text,
  subsidiaries_details text,
  subsidiaries_y_n boolean,
  federal_tax_id_number numeric,
  owner_executive uuid references persons(id),
  required_filings_other text,
  general_liability_y_n boolean,
  mailing_address_link uuid references addresses(id),
  another_name_or_dot_details text,
  liability_limit text   -- option: Limit_opt,
  pip_supplementary_coverages text,
  another_name_or_dot_y_n boolean,
  carrier_team_driver_y_n boolean,
  number_of_years_in_business numeric,
  applicant_s_signature_y_n boolean,
  applicant_s_title text   -- option: Prefix_opt,
  common_states_and_major_cities text,
  carrier_type text   -- option: Carrier_types_opt,
  commodities_list text[]   -- option: Commodity_opt,
  cancelled_in_last_3_years_details text,
  cancelled_in_last_3_years_y_n boolean,
  number_of_years_owner_s_experience numeric,
  form_of_business text   -- option: Legal_entities_opt,
  carrier_involved_in_non_trucking_y_n boolean,
  any_operations_in_canada_or_mexico_y_n boolean,
  required_filings_type text   -- option: mtm_required_filings,
  other_supplementary_coverage_list_ids numeric[],
  drivers_complete_employment_applications_y_n boolean
);

create table if not exists quote_status_change_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  end_date timestamptz,
  start_date timestamptz,
  status_ended_by text,
  current_quote_id text,
  status_started_by text,
  status_type quote_status_enum,
  date_range_in_this_status text,
  time_interval_in_this_status text
);

create table if not exists quote_details (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  url_mtm text,
  json_mtm text,
  url_quote text,
  driveross numeric,
  has_terminal text,
  quote_main_link uuid references quotes(id),
  quote_main_id text,
  uiiendorsement numeric,
  cargo_y_n boolean,
  json_mtm_response text,
  sent_emails_list text[],
  calculated_cargo_value numeric,
  mtm_form_link uuid references mtm_forms(id),
  reefer_breakdown_y_n boolean,
  fleet_size text   -- option: Fleet_size_opt,
  liability_limit text   -- option: Limit_opt,
  total_physical_damage numeric,
  quote_status_last_change_date timestamptz,
  cargo_limit text   -- option: Cargo_limit_opt,
  commodities text[]   -- option: Commodity_opt,
  cargo_deductible text   -- option: Cargo_deductible_opt,
  number_employees text   -- option: Number_employees_opt,
  quote_status_change_new_log uuid references quote_status_change_logs(id),
  quote_status_change_previous_log uuid references quote_status_change_logs(id)
);

create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  bind_date timestamptz,
  "9_payments" numeric,
  mtm_quote_id text,
  down_payment numeric,
  effective_date timestamptz,
  agency_link uuid references agencies(id),
  expiration_date timestamptz,
  mtm_proposal_number text,
  policy_link uuid references policies(id),
  total_premium numeric,
  processing_fee numeric,
  qrs_completed boolean,
  quote_details_id text,
  special_offer boolean,
  insured_link uuid references insureds(id),
  sort_quote_status text,
  search_agency_name text,
  prospect_link uuid references prospects(id),
  search_insured_name text,
  has_uploaded_files boolean,
  edited_by_master_admin boolean,
  quote_details_link uuid references quote_details(id),
  quote_status quote_status_enum
);

create table if not exists policy_details (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  policy_main_id text,
  policy_main_link uuid references policies(id),
  current_quote_id text,
  commodities text[]   -- option: Commodity_opt,
  coverages_list text[]   -- option: Coverage_enums_opt
);

create table if not exists policies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  mtm_policy_id text,
  agency_id text,
  bind_date timestamptz,
  mtm_policy_no text,
  effective_date timestamptz,
  agency uuid references agencies(id),
  expiration_date timestamptz,
  total_premium numeric,
  current_quote_id text,
  sort_agency_name text,
  insured_link uuid references insureds(id),
  policy_details_id text,
  sort_insured_name text,
  policy_details_link uuid references policy_details(id)
);

create table if not exists get_quote_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  quote_id text,
  sended_url text,
  days_valid numeric,
  valid_to_date timestamptz,
  agency uuid references agencies(id),
  quote_link uuid references quotes(id),
  prospect uuid references prospects(id),
  sended_to_email uuid references emails(id)
);

create table if not exists uploaded_files (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  file text,
  file_url text,
  file_name text,
  file_type_text text,
  current_quote_id text,
  file_type text   -- option: File_type_opt,
  current_quote_link uuid references quotes(id)
);

create table if not exists saved_pdfs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  pdf_url text,
  quote uuid references quotes(id),
  current_quote_id text
);

create table if not exists json_files (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  json_file text,
  json_text text,
  current_quote_id text
);

create table if not exists json_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  url text,
  sended text,
  recieved text,
  quote_link uuid references quotes(id)
);

create table if not exists background_tasks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  task_name text,
  is_complete boolean,
  users_counter numeric,
  quotes_counter numeric,
  agencies_counter numeric,
  insureds_counter numeric,
  policies_counter numeric,
  prospect_counter numeric,
  user_roles_counter numeric,
  users_details_counter numeric
);

create table if not exists background_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  last_update_date timestamptz,
  sidebar_selected text   -- option: Sidebar Menu_opt
);

create table if not exists statistics (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  last_updated timestamptz,
  current_quote_id text,
  states_covered numeric,
  bound_last_week numeric,
  users_last_week numeric,
  agents_last_week numeric,
  bound_last_month numeric,
  quotes_last_week numeric,
  users_last_month numeric,
  agents_last_month numeric,
  drivers_last_week numeric,
  quotes_last_month numeric,
  users_total_number numeric,
  agencies_last_week numeric,
  bound_total_number numeric,
  drivers_last_month numeric,
  vehicles_last_week numeric,
  agencies_last_month numeric,
  agents_total_number numeric,
  bound_last_3_months numeric,
  bound_last_6_months numeric,
  follow_up_last_week numeric,
  quotes_total_number numeric,
  quotes_amount_total numeric,
  users_last_3_months numeric,
  users_last_6_months numeric,
  vehicles_last_month numeric,
  agents_last_3_months numeric,
  agents_last_6_months numeric,
  bound_last_12_months numeric,
  drivers_total_number numeric,
  follow_up_last_month numeric,
  quotes_last_3_months numeric,
  quotes_last_6_months numeric,
  users_last_12_months numeric,
  agencies_total_number numeric,
  agents_last_12_months numeric,
  drivers_last_3_months numeric,
  drivers_last_6_months numeric,
  in_progress_last_week numeric,
  quotes_last_12_months numeric,
  vehicles_total_number numeric,
  agencies_last_3_months numeric,
  agencies_last_6_months numeric,
  declined_mtm_last_week numeric,
  drivers_last_12_months numeric,
  follow_up_total_number numeric,
  in_progress_last_month numeric,
  underwriting_last_week numeric,
  vehicles_last_3_months numeric,
  vehicles_last_6_months numeric,
  agencies_last_12_months numeric,
  declined_mtm_last_month numeric,
  follow_up_last_3_months numeric,
  follow_up_last_6_months numeric,
  quotes_amount_last_week numeric,
  special_offer_last_week numeric,
  underwriting_last_month numeric,
  vehicles_last_12_months numeric,
  follow_up_last_12_months numeric,
  in_progress_total_number numeric,
  quotes_amount_last_month numeric,
  special_offer_last_month numeric,
  uploaded_files_last_week numeric,
  declined_mtm_total_number numeric,
  in_progress_last_3_months numeric,
  in_progress_last_6_months numeric,
  underwriting_total_number numeric,
  uploaded_files_last_month numeric,
  declined_mtm_last_3_months numeric,
  declined_mtm_last_6_months numeric,
  deleted_hidden_last_week numeric,
  in_progress_last_12_months numeric,
  sent_to_customer_last_week numeric,
  special_offer_total_number numeric,
  underwriting_last_3_months numeric,
  underwriting_last_6_months numeric,
  declined_mtm_last_12_months numeric,
  deleted_hidden_last_month numeric,
  quotes_amount_last_3_months numeric,
  quotes_amount_last_6_months numeric,
  sent_to_customer_last_month numeric,
  special_offer_last_3_months numeric,
  special_offer_last_6_months numeric,
  underwriting_last_12_months numeric,
  uploaded_files_total_number numeric,
  waiting_on_broker_last_week numeric,
  quotes_amount_last_12_months numeric,
  special_offer_last_12_months numeric,
  uploaded_files_last_3_months numeric,
  uploaded_files_last_6_months numeric,
  waiting_on_broker_last_month numeric,
  deleted_hidden_total_number numeric,
  sent_to_customer_total_number numeric,
  uploaded_files_last_12_months numeric,
  declined_diamondback_last_week numeric,
  deleted_hidden_last_3_months numeric,
  deleted_hidden_last_6_months numeric,
  sent_to_customer_last_3_months numeric,
  sent_to_customer_last_6_months numeric,
  waiting_on_broker_total_number numeric,
  declined_diamondback_last_month numeric,
  deleted_hidden_last_12_months numeric,
  sent_to_customer_last_12_months numeric,
  waiting_on_broker_last_3_months numeric,
  waiting_on_broker_last_6_months numeric,
  waiting_on_broker_last_12_months numeric,
  declined_diamondback_total_number numeric,
  deleted_special_offer_last_week numeric,
  declined_diamondback_last_3_months numeric,
  declined_diamondback_last_6_months numeric,
  deleted_special_offer_last_month numeric,
  declined_diamondback_last_12_months numeric,
  deleted_special_offer_total_number numeric,
  deleted_special_offer_last_3_months numeric,
  deleted_special_offer_last_6_months numeric,
  deleted_special_offer_last_12_months numeric
);

create table if not exists company_details (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  website text,
  company_main_id text,
  current_quote_id text,
  company_main_link uuid references companies(id)
);

-- ---- created_by FKs (added after app_users exists) ----
alter table app_settings add constraint fk_app_settings_created_by foreign key (created_by) references app_users(id);
alter table addresses add constraint fk_addresses_created_by foreign key (created_by) references app_users(id);
alter table phones add constraint fk_phones_created_by foreign key (created_by) references app_users(id);
alter table emails add constraint fk_emails_created_by foreign key (created_by) references app_users(id);
alter table credentials add constraint fk_credentials_created_by foreign key (created_by) references app_users(id);
alter table agencies add constraint fk_agencies_created_by foreign key (created_by) references app_users(id);
alter table agency_details add constraint fk_agency_details_created_by foreign key (created_by) references app_users(id);
alter table user_details add constraint fk_user_details_created_by foreign key (created_by) references app_users(id);
alter table permissions add constraint fk_permissions_created_by foreign key (created_by) references app_users(id);
alter table user_roles add constraint fk_user_roles_created_by foreign key (created_by) references app_users(id);
alter table companies add constraint fk_companies_created_by foreign key (created_by) references app_users(id);
alter table person_details add constraint fk_person_details_created_by foreign key (created_by) references app_users(id);
alter table persons add constraint fk_persons_created_by foreign key (created_by) references app_users(id);
alter table vehicles add constraint fk_vehicles_created_by foreign key (created_by) references app_users(id);
alter table violations add constraint fk_violations_created_by foreign key (created_by) references app_users(id);
alter table gcl add constraint fk_gcl_created_by foreign key (created_by) references app_users(id);
alter table prospects add constraint fk_prospects_created_by foreign key (created_by) references app_users(id);
alter table prospect_details add constraint fk_prospect_details_created_by foreign key (created_by) references app_users(id);
alter table insureds add constraint fk_insureds_created_by foreign key (created_by) references app_users(id);
alter table insured_details add constraint fk_insured_details_created_by foreign key (created_by) references app_users(id);
alter table fees add constraint fk_fees_created_by foreign key (created_by) references app_users(id);
alter table taxes add constraint fk_taxes_created_by foreign key (created_by) references app_users(id);
alter table premiums add constraint fk_premiums_created_by foreign key (created_by) references app_users(id);
alter table endorsements add constraint fk_endorsements_created_by foreign key (created_by) references app_users(id);
alter table coverage_limits add constraint fk_coverage_limits_created_by foreign key (created_by) references app_users(id);
alter table mtm_forms add constraint fk_mtm_forms_created_by foreign key (created_by) references app_users(id);
alter table quote_status_change_logs add constraint fk_quote_status_change_logs_created_by foreign key (created_by) references app_users(id);
alter table quote_details add constraint fk_quote_details_created_by foreign key (created_by) references app_users(id);
alter table quotes add constraint fk_quotes_created_by foreign key (created_by) references app_users(id);
alter table policy_details add constraint fk_policy_details_created_by foreign key (created_by) references app_users(id);
alter table policies add constraint fk_policies_created_by foreign key (created_by) references app_users(id);
alter table get_quote_sessions add constraint fk_get_quote_sessions_created_by foreign key (created_by) references app_users(id);
alter table uploaded_files add constraint fk_uploaded_files_created_by foreign key (created_by) references app_users(id);
alter table saved_pdfs add constraint fk_saved_pdfs_created_by foreign key (created_by) references app_users(id);
alter table json_files add constraint fk_json_files_created_by foreign key (created_by) references app_users(id);
alter table json_logs add constraint fk_json_logs_created_by foreign key (created_by) references app_users(id);
alter table background_tasks add constraint fk_background_tasks_created_by foreign key (created_by) references app_users(id);
alter table background_sessions add constraint fk_background_sessions_created_by foreign key (created_by) references app_users(id);
alter table statistics add constraint fk_statistics_created_by foreign key (created_by) references app_users(id);
alter table company_details add constraint fk_company_details_created_by foreign key (created_by) references app_users(id);

-- ---- Many-to-many / list-reference join tables ----
create table if not exists app_users__current_agency (
  app_user_id uuid not null references app_users(id) on delete cascade,
  agencie_id uuid not null references agencies(id) on delete cascade,
  position int,
  primary key (app_user_id, agencie_id)
);
create table if not exists agency_details__emails (
  agency_detail_id uuid not null references agency_details(id) on delete cascade,
  email_id uuid not null references emails(id) on delete cascade,
  position int,
  primary key (agency_detail_id, email_id)
);
create table if not exists agency_details__phones (
  agency_detail_id uuid not null references agency_details(id) on delete cascade,
  phone_id uuid not null references phones(id) on delete cascade,
  position int,
  primary key (agency_detail_id, phone_id)
);
create table if not exists agency_details__credentials (
  agency_detail_id uuid not null references agency_details(id) on delete cascade,
  credential_id uuid not null references credentials(id) on delete cascade,
  position int,
  primary key (agency_detail_id, credential_id)
);
create table if not exists user_details__list_of_agencies (
  user_detail_id uuid not null references user_details(id) on delete cascade,
  agencie_id uuid not null references agencies(id) on delete cascade,
  position int,
  primary key (user_detail_id, agencie_id)
);
create table if not exists user_details__list_of_user_roles (
  user_detail_id uuid not null references user_details(id) on delete cascade,
  user_role_id uuid not null references user_roles(id) on delete cascade,
  position int,
  primary key (user_detail_id, user_role_id)
);
create table if not exists person_details__emails (
  person_detail_id uuid not null references person_details(id) on delete cascade,
  email_id uuid not null references emails(id) on delete cascade,
  position int,
  primary key (person_detail_id, email_id)
);
create table if not exists person_details__phones (
  person_detail_id uuid not null references person_details(id) on delete cascade,
  phone_id uuid not null references phones(id) on delete cascade,
  position int,
  primary key (person_detail_id, phone_id)
);
create table if not exists person_details__violations (
  person_detail_id uuid not null references person_details(id) on delete cascade,
  violation_id uuid not null references violations(id) on delete cascade,
  position int,
  primary key (person_detail_id, violation_id)
);
create table if not exists persons__link_to_company_s (
  person_id uuid not null references persons(id) on delete cascade,
  companie_id uuid not null references companies(id) on delete cascade,
  position int,
  primary key (person_id, companie_id)
);
create table if not exists prospect_details__drivers_list (
  prospect_detail_id uuid not null references prospect_details(id) on delete cascade,
  person_id uuid not null references persons(id) on delete cascade,
  position int,
  primary key (prospect_detail_id, person_id)
);
create table if not exists prospect_details__vehicles_list (
  prospect_detail_id uuid not null references prospect_details(id) on delete cascade,
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  position int,
  primary key (prospect_detail_id, vehicle_id)
);
create table if not exists insured_details__drivers (
  insured_detail_id uuid not null references insured_details(id) on delete cascade,
  person_id uuid not null references persons(id) on delete cascade,
  position int,
  primary key (insured_detail_id, person_id)
);
create table if not exists insured_details__vehicles (
  insured_detail_id uuid not null references insured_details(id) on delete cascade,
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  position int,
  primary key (insured_detail_id, vehicle_id)
);
create table if not exists endorsements__fees (
  endorsement_id uuid not null references endorsements(id) on delete cascade,
  fee_id uuid not null references fees(id) on delete cascade,
  position int,
  primary key (endorsement_id, fee_id)
);
create table if not exists endorsements__taxes (
  endorsement_id uuid not null references endorsements(id) on delete cascade,
  taxe_id uuid not null references taxes(id) on delete cascade,
  position int,
  primary key (endorsement_id, taxe_id)
);
create table if not exists endorsements__premiums (
  endorsement_id uuid not null references endorsements(id) on delete cascade,
  premium_id uuid not null references premiums(id) on delete cascade,
  position int,
  primary key (endorsement_id, premium_id)
);
create table if not exists mtm_forms__drivers_list (
  mtm_form_id uuid not null references mtm_forms(id) on delete cascade,
  person_id uuid not null references persons(id) on delete cascade,
  position int,
  primary key (mtm_form_id, person_id)
);
create table if not exists mtm_forms__vehicles_list (
  mtm_form_id uuid not null references mtm_forms(id) on delete cascade,
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  position int,
  primary key (mtm_form_id, vehicle_id)
);
create table if not exists mtm_forms__mtm_coverage_limits_list (
  mtm_form_id uuid not null references mtm_forms(id) on delete cascade,
  coverage_limit_id uuid not null references coverage_limits(id) on delete cascade,
  position int,
  primary key (mtm_form_id, coverage_limit_id)
);
create table if not exists quote_details__fees_list (
  quote_detail_id uuid not null references quote_details(id) on delete cascade,
  fee_id uuid not null references fees(id) on delete cascade,
  position int,
  primary key (quote_detail_id, fee_id)
);
create table if not exists quote_details__taxes (
  quote_detail_id uuid not null references quote_details(id) on delete cascade,
  taxe_id uuid not null references taxes(id) on delete cascade,
  position int,
  primary key (quote_detail_id, taxe_id)
);
create table if not exists quote_details__drivers (
  quote_detail_id uuid not null references quote_details(id) on delete cascade,
  person_id uuid not null references persons(id) on delete cascade,
  position int,
  primary key (quote_detail_id, person_id)
);
create table if not exists quote_details__endorsements_list (
  quote_detail_id uuid not null references quote_details(id) on delete cascade,
  endorsement_id uuid not null references endorsements(id) on delete cascade,
  position int,
  primary key (quote_detail_id, endorsement_id)
);
create table if not exists quote_details__premiums_list (
  quote_detail_id uuid not null references quote_details(id) on delete cascade,
  premium_id uuid not null references premiums(id) on delete cascade,
  position int,
  primary key (quote_detail_id, premium_id)
);
create table if not exists quote_details__vehicles (
  quote_detail_id uuid not null references quote_details(id) on delete cascade,
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  position int,
  primary key (quote_detail_id, vehicle_id)
);
create table if not exists quote_details__coverage_limits_list (
  quote_detail_id uuid not null references quote_details(id) on delete cascade,
  coverage_limit_id uuid not null references coverage_limits(id) on delete cascade,
  position int,
  primary key (quote_detail_id, coverage_limit_id)
);
create table if not exists quote_details__quote_status_changes_list (
  quote_detail_id uuid not null references quote_details(id) on delete cascade,
  quote_status_change_log_id uuid not null references quote_status_change_logs(id) on delete cascade,
  position int,
  primary key (quote_detail_id, quote_status_change_log_id)
);
create table if not exists policy_details__fees (
  policy_detail_id uuid not null references policy_details(id) on delete cascade,
  fee_id uuid not null references fees(id) on delete cascade,
  position int,
  primary key (policy_detail_id, fee_id)
);
create table if not exists policy_details__taxes (
  policy_detail_id uuid not null references policy_details(id) on delete cascade,
  taxe_id uuid not null references taxes(id) on delete cascade,
  position int,
  primary key (policy_detail_id, taxe_id)
);
create table if not exists policy_details__drivers (
  policy_detail_id uuid not null references policy_details(id) on delete cascade,
  person_id uuid not null references persons(id) on delete cascade,
  position int,
  primary key (policy_detail_id, person_id)
);
create table if not exists policy_details__endorsements (
  policy_detail_id uuid not null references policy_details(id) on delete cascade,
  endorsement_id uuid not null references endorsements(id) on delete cascade,
  position int,
  primary key (policy_detail_id, endorsement_id)
);
create table if not exists policy_details__premiums (
  policy_detail_id uuid not null references policy_details(id) on delete cascade,
  premium_id uuid not null references premiums(id) on delete cascade,
  position int,
  primary key (policy_detail_id, premium_id)
);
create table if not exists policy_details__vehicles (
  policy_detail_id uuid not null references policy_details(id) on delete cascade,
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  position int,
  primary key (policy_detail_id, vehicle_id)
);
create table if not exists policy_details__coverage_limit_list (
  policy_detail_id uuid not null references policy_details(id) on delete cascade,
  coverage_limit_id uuid not null references coverage_limits(id) on delete cascade,
  position int,
  primary key (policy_detail_id, coverage_limit_id)
);
create table if not exists background_tasks__quotes (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  quote_id uuid not null references quotes(id) on delete cascade,
  position int,
  primary key (background_task_id, quote_id)
);
create table if not exists background_tasks__agencies (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  agencie_id uuid not null references agencies(id) on delete cascade,
  position int,
  primary key (background_task_id, agencie_id)
);
create table if not exists background_tasks__insureds (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  insured_id uuid not null references insureds(id) on delete cascade,
  position int,
  primary key (background_task_id, insured_id)
);
create table if not exists background_tasks__policies (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  policie_id uuid not null references policies(id) on delete cascade,
  position int,
  primary key (background_task_id, policie_id)
);
create table if not exists background_tasks__users (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  user_role_id uuid not null references user_roles(id) on delete cascade,
  position int,
  primary key (background_task_id, user_role_id)
);
create table if not exists background_tasks__prospects (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  prospect_id uuid not null references prospects(id) on delete cascade,
  position int,
  primary key (background_task_id, prospect_id)
);
create table if not exists background_tasks__user_roles (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  user_role_id uuid not null references user_roles(id) on delete cascade,
  position int,
  primary key (background_task_id, user_role_id)
);
create table if not exists background_tasks__users_details (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  user_detail_id uuid not null references user_details(id) on delete cascade,
  position int,
  primary key (background_task_id, user_detail_id)
);
create table if not exists background_tasks__quotes_details (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  quote_detail_id uuid not null references quote_details(id) on delete cascade,
  position int,
  primary key (background_task_id, quote_detail_id)
);
create table if not exists background_tasks__agencies_details (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  agency_detail_id uuid not null references agency_details(id) on delete cascade,
  position int,
  primary key (background_task_id, agency_detail_id)
);
create table if not exists background_tasks__policies_details (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  policy_detail_id uuid not null references policy_details(id) on delete cascade,
  position int,
  primary key (background_task_id, policy_detail_id)
);
create table if not exists background_tasks__prospect_details (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  prospect_detail_id uuid not null references prospect_details(id) on delete cascade,
  position int,
  primary key (background_task_id, prospect_detail_id)
);
create table if not exists background_tasks__insureds_details (
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  insured_detail_id uuid not null references insured_details(id) on delete cascade,
  position int,
  primary key (background_task_id, insured_detail_id)
);
create table if not exists background_sessions__tasks_list (
  background_session_id uuid not null references background_sessions(id) on delete cascade,
  background_task_id uuid not null references background_tasks(id) on delete cascade,
  position int,
  primary key (background_session_id, background_task_id)
);
create table if not exists company_details__emails (
  company_detail_id uuid not null references company_details(id) on delete cascade,
  email_id uuid not null references emails(id) on delete cascade,
  position int,
  primary key (company_detail_id, email_id)
);
create table if not exists company_details__phones (
  company_detail_id uuid not null references company_details(id) on delete cascade,
  phone_id uuid not null references phones(id) on delete cascade,
  position int,
  primary key (company_detail_id, phone_id)
);

-- ---- Suggested indexes ----
create index if not exists idx_quotes_agency on quotes(agency_link);
create index if not exists idx_quotes_insured on quotes(insured_link);
create index if not exists idx_quotes_prospect on quotes(prospect_link);
create index if not exists idx_quotes_status on quotes(quote_status);
create index if not exists idx_policies_agency on policies(agency);
create index if not exists idx_policies_insured on policies(insured_link);
create index if not exists idx_insureds_agency on insureds(agency_link);
create index if not exists idx_prospects_agency on prospects(agency_link);
create index if not exists idx_persons_current_quote on persons(current_quote_link);
create index if not exists idx_bgtask_status on background_tasks(status);

-- ---- updated_at trigger ----
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
-- Attach per table, e.g.:
-- create trigger trg_quotes_updated before update on quotes
--   for each row execute function set_updated_at();
