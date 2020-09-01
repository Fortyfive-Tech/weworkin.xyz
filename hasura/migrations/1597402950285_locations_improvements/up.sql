CREATE TABLE public.locations (
    id integer NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    is_public boolean DEFAULT false,
    city_slug text
);
CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;
CREATE TABLE public.roles (
    id integer NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    is_public boolean DEFAULT false
);
CREATE SEQUENCE public.positions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.positions_id_seq OWNED BY public.roles.id;
CREATE TABLE public.profiles (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    open_to_relocation boolean DEFAULT false NOT NULL,
    open_to_remote_work boolean DEFAULT true NOT NULL,
    linkedin_url text NOT NULL,
    resume_url text NOT NULL,
    website_url text NOT NULL,
    description text,
    position_title text,
    location_id integer,
    is_public boolean DEFAULT false,
    email text,
    created_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.profiles_roles (
    profile_id uuid NOT NULL,
    role_id integer NOT NULL
);
ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);
ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.positions_id_seq'::regclass);
ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_city_slug_key UNIQUE (city_slug);
ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.roles
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_email_key UNIQUE (email);
ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.profiles_roles
    ADD CONSTRAINT profiles_positions_pkey PRIMARY KEY (profile_id, role_id);
ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.profiles_roles
    ADD CONSTRAINT profiles_positions_position_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.profiles_roles
    ADD CONSTRAINT profiles_positions_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
