--
-- PostgreSQL database dump
--

\restrict OobDfDz6dyO3bWK0EY6g4Jer5ldOTp5MNe1kRhWEBziLekwXjpCHFbp1bPaTwg6

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-08-13 07:53:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 24601)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    category_name character varying(100) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24600)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 4974 (class 0 OID 0)
-- Dependencies: 225
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 220 (class 1259 OID 16386)
-- Name: guests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guests (
    id integer NOT NULL,
    full_name character varying(100),
    phone character varying(20),
    email character varying(100),
    address text,
    check_in date,
    check_out date,
    room_number character varying(10)
);


ALTER TABLE public.guests OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16385)
-- Name: guests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.guests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.guests_id_seq OWNER TO postgres;

--
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 219
-- Name: guests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.guests_id_seq OWNED BY public.guests.id;


--
-- TOC entry 222 (class 1259 OID 16396)
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory (
    id integer NOT NULL,
    item_name character varying(150) NOT NULL,
    category character varying(100) NOT NULL,
    quantity integer DEFAULT 0,
    unit character varying(50),
    purchase_price numeric(10,2),
    selling_price numeric(10,2),
    supplier character varying(150),
    reorder_level integer DEFAULT 10,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.inventory OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16395)
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventory_id_seq OWNER TO postgres;

--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 221
-- Name: inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventory_id_seq OWNED BY public.inventory.id;


--
-- TOC entry 228 (class 1259 OID 24615)
-- Name: purchases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchases (
    id integer NOT NULL,
    inventory_id integer NOT NULL,
    supplier_id integer NOT NULL,
    quantity integer NOT NULL,
    purchase_price numeric(10,2) NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    purchase_date date NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.purchases OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24614)
-- Name: purchases_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.purchases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.purchases_id_seq OWNER TO postgres;

--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 227
-- Name: purchases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.purchases_id_seq OWNED BY public.purchases.id;


--
-- TOC entry 230 (class 1259 OID 24641)
-- Name: stock_issues; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stock_issues (
    id integer NOT NULL,
    inventory_id integer NOT NULL,
    department character varying(100) NOT NULL,
    issued_to character varying(100) NOT NULL,
    quantity integer NOT NULL,
    issue_date date NOT NULL,
    remarks text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.stock_issues OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24640)
-- Name: stock_issues_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stock_issues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stock_issues_id_seq OWNER TO postgres;

--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 229
-- Name: stock_issues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stock_issues_id_seq OWNED BY public.stock_issues.id;


--
-- TOC entry 224 (class 1259 OID 16409)
-- Name: suppliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suppliers (
    id integer NOT NULL,
    company_name character varying(150) NOT NULL,
    contact_person character varying(100),
    phone character varying(20),
    email character varying(100),
    address text,
    notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.suppliers OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16408)
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suppliers_id_seq OWNER TO postgres;

--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 223
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;


--
-- TOC entry 4787 (class 2604 OID 24604)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4780 (class 2604 OID 16389)
-- Name: guests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guests ALTER COLUMN id SET DEFAULT nextval('public.guests_id_seq'::regclass);


--
-- TOC entry 4781 (class 2604 OID 16399)
-- Name: inventory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory ALTER COLUMN id SET DEFAULT nextval('public.inventory_id_seq'::regclass);


--
-- TOC entry 4789 (class 2604 OID 24618)
-- Name: purchases id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases ALTER COLUMN id SET DEFAULT nextval('public.purchases_id_seq'::regclass);


--
-- TOC entry 4791 (class 2604 OID 24644)
-- Name: stock_issues id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_issues ALTER COLUMN id SET DEFAULT nextval('public.stock_issues_id_seq'::regclass);


--
-- TOC entry 4785 (class 2604 OID 16412)
-- Name: suppliers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);


--
-- TOC entry 4964 (class 0 OID 24601)
-- Dependencies: 226
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, category_name, description, created_at) FROM stdin;
2	Drink	Beverages and drinks	2026-08-12 19:04:39.637819
\.


--
-- TOC entry 4958 (class 0 OID 16386)
-- Dependencies: 220
-- Data for Name: guests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.guests (id, full_name, phone, email, address, check_in, check_out, room_number) FROM stdin;
\.


--
-- TOC entry 4960 (class 0 OID 16396)
-- Dependencies: 222
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory (id, item_name, category, quantity, unit, purchase_price, selling_price, supplier, reorder_level, created_at) FROM stdin;
3	Coca Cola	Drink	60	Bottle	500.00	900.00	NBC	20	2026-07-26 15:31:30.920492
\.


--
-- TOC entry 4966 (class 0 OID 24615)
-- Dependencies: 228
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchases (id, inventory_id, supplier_id, quantity, purchase_price, total_amount, purchase_date, created_at) FROM stdin;
1	3	5	20	500.00	10000.00	2026-08-02	2026-08-02 22:48:07.580059
2	3	5	30	500.00	15000.00	2026-08-03	2026-08-03 00:23:00.831822
\.


--
-- TOC entry 4968 (class 0 OID 24641)
-- Dependencies: 230
-- Data for Name: stock_issues; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stock_issues (id, inventory_id, department, issued_to, quantity, issue_date, remarks, created_at) FROM stdin;
1	3	Bar	Bromford Hotel	20	2026-08-12		2026-08-12 16:30:31.998971
2	3	Bar	Bromford Hotel	10	2026-08-12	Stock deduction test	2026-08-12 16:37:48.80892
3	3	Bar	Bromford Hotel	10	2026-08-12	Final stock deduction test	2026-08-12 19:15:20.688807
\.


--
-- TOC entry 4962 (class 0 OID 16409)
-- Dependencies: 224
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suppliers (id, company_name, contact_person, phone, email, address, notes, created_at) FROM stdin;
5	NBC	Chinaza Chimeziri	07060537172	chimezirichinaza@gmail.com	Athan Ogoh Avenue	Official	2026-08-02 16:24:56.43478
\.


--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 225
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 2, true);


--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 219
-- Name: guests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.guests_id_seq', 1, false);


--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 221
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventory_id_seq', 3, true);


--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 227
-- Name: purchases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.purchases_id_seq', 2, true);


--
-- TOC entry 4984 (class 0 OID 0)
-- Dependencies: 229
-- Name: stock_issues_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stock_issues_id_seq', 3, true);


--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 223
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 5, true);


--
-- TOC entry 4800 (class 2606 OID 24613)
-- Name: categories categories_category_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_category_name_key UNIQUE (category_name);


--
-- TOC entry 4802 (class 2606 OID 24611)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4794 (class 2606 OID 16394)
-- Name: guests guests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guests
    ADD CONSTRAINT guests_pkey PRIMARY KEY (id);


--
-- TOC entry 4796 (class 2606 OID 16407)
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);


--
-- TOC entry 4804 (class 2606 OID 24628)
-- Name: purchases purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_pkey PRIMARY KEY (id);


--
-- TOC entry 4806 (class 2606 OID 24655)
-- Name: stock_issues stock_issues_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_issues
    ADD CONSTRAINT stock_issues_pkey PRIMARY KEY (id);


--
-- TOC entry 4798 (class 2606 OID 16419)
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- TOC entry 4807 (class 2606 OID 24629)
-- Name: purchases purchases_inventory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_inventory_id_fkey FOREIGN KEY (inventory_id) REFERENCES public.inventory(id) ON DELETE CASCADE;


--
-- TOC entry 4808 (class 2606 OID 24634)
-- Name: purchases purchases_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id) ON DELETE CASCADE;


--
-- TOC entry 4809 (class 2606 OID 24656)
-- Name: stock_issues stock_issues_inventory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_issues
    ADD CONSTRAINT stock_issues_inventory_id_fkey FOREIGN KEY (inventory_id) REFERENCES public.inventory(id);


-- Completed on 2026-08-13 07:53:37

--
-- PostgreSQL database dump complete
--

\unrestrict OobDfDz6dyO3bWK0EY6g4Jer5ldOTp5MNe1kRhWEBziLekwXjpCHFbp1bPaTwg6

