--
-- PostgreSQL database dump
--

-- Dumped from database version 10.8 (Ubuntu 10.8-1.pgdg18.04+1)
-- Dumped by pg_dump version 11.3 (Ubuntu 11.3-1.pgdg18.04+1)

-- Started on 2019-07-12 17:17:19 GMT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 199 (class 1259 OID 16442)
-- Name: cars; Type: TABLE; Schema: public; Owner: abiodun
--

CREATE TABLE public.cars (
    id integer NOT NULL,
    owner integer NOT NULL,
    created_on timestamp(4) with time zone NOT NULL,
    state character varying(10) NOT NULL,
    status character varying(20) NOT NULL,
    price numeric NOT NULL,
    model character varying(50),
    body_type character varying(50),
    car_image character varying(200) NOT NULL,
    manufacturer character varying(50) NOT NULL
);


ALTER TABLE public.cars OWNER TO abiodun;

--
-- TOC entry 198 (class 1259 OID 16440)
-- Name: cars_id_seq; Type: SEQUENCE; Schema: public; Owner: abiodun
--

CREATE SEQUENCE public.cars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cars_id_seq OWNER TO abiodun;

--
-- TOC entry 2946 (class 0 OID 0)
-- Dependencies: 198
-- Name: cars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abiodun
--

ALTER SEQUENCE public.cars_id_seq OWNED BY public.cars.id;


--
-- TOC entry 201 (class 1259 OID 16494)
-- Name: orders; Type: TABLE; Schema: public; Owner: abiodun
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    buyer integer NOT NULL,
    car_id integer NOT NULL,
    amount numeric NOT NULL,
    status character varying(20) NOT NULL
);


ALTER TABLE public.orders OWNER TO abiodun;

--
-- TOC entry 200 (class 1259 OID 16492)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: abiodun
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO abiodun;

--
-- TOC entry 2947 (class 0 OID 0)
-- Dependencies: 200
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abiodun
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 197 (class 1259 OID 16429)
-- Name: users; Type: TABLE; Schema: public; Owner: abiodun
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    password character varying(1000) NOT NULL,
    address character varying(200) NOT NULL,
    is_admin boolean
);


ALTER TABLE public.users OWNER TO abiodun;

--
-- TOC entry 196 (class 1259 OID 16427)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: abiodun
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO abiodun;

--
-- TOC entry 2948 (class 0 OID 0)
-- Dependencies: 196
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abiodun
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2800 (class 2604 OID 16530)
-- Name: cars id; Type: DEFAULT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.cars ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);


--
-- TOC entry 2801 (class 2604 OID 16552)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 2799 (class 2604 OID 16583)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2938 (class 0 OID 16442)
-- Dependencies: 199
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: abiodun
--

COPY public.cars (id, owner, created_on, state, status, price, model, body_type, car_image, manufacturer) FROM stdin;
9	1	2019-06-21 00:00:00+00	new	available	90000.00	camry	car	https://res.cloudinary.com/stepheng323/image/upload/v1561109138/xpl5p43ahg5ahahnpogw.jpg	toyota
10	7	2019-06-21 00:00:00+00	new	available	70000.00	wrangler	car	https://res.cloudinary.com/stepheng323/image/upload/v1561114507/lej5gecia2jz1lznifuo.jpg	jeep
\.


--
-- TOC entry 2940 (class 0 OID 16494)
-- Dependencies: 201
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: abiodun
--

COPY public.orders (id, buyer, car_id, amount, status) FROM stdin;
29	7	9	50000.00	pending
34	7	9	50000.00	pending
35	7	9	50000.00	pending
36	7	9	50000.00	pending
37	7	9	50000.00	pending
38	7	9	50000.00	pending
39	7	9	50000.00	pending
41	7	9	50000.00	pending
42	7	9	50000.00	pending
43	7	9	50000.00	pending
58	7	9	50000.00	pending
62	7	9	50000.00	pending
63	7	9	50000.00	pending
64	7	9	50000.00	pending
65	7	9	50000.00	pending
66	7	9	50000.00	pending
67	7	9	50000.00	pending
68	7	9	50000.00	pending
69	7	9	50000.00	pending
70	7	9	50000.00	pending
71	7	9	50000.00	pending
72	7	9	50000.00	pending
73	7	9	50000.00	pending
74	7	9	50000.00	pending
75	7	9	50000.00	pending
76	7	9	50000.00	pending
77	7	9	50000.00	pending
78	7	9	50000.00	pending
79	7	9	50000.00	pending
80	7	9	50000.00	pending
81	7	9	50000.00	pending
82	7	9	50000.00	pending
83	7	9	50000.00	pending
84	7	9	50000.00	pending
85	7	9	50000.00	pending
86	7	9	50000.00	pending
87	7	9	50000.00	pending
88	7	9	50000.00	pending
89	7	9	50000.00	pending
90	7	9	50000.00	pending
91	7	9	50000.00	pending
92	7	9	50000.00	pending
93	7	9	50000.00	pending
94	7	9	50000.00	pending
95	7	9	50000.00	pending
96	7	9	50000.00	pending
97	7	9	50000.00	pending
98	7	9	50000.00	pending
99	7	9	50000.00	pending
100	7	9	50000.00	pending
101	7	9	50000.00	pending
102	7	9	50000.00	pending
103	7	9	50000.00	pending
105	7	9	50000.00	pending
106	7	9	50000.00	pending
40	7	9	70000.00	pending
107	7	9	7000	pending
112	6	9	75000	pending
22	6	10	10000.00	pending
23	7	10	12000.00	pending
24	7	10	12000.00	pending
25	7	10	12000.00	pending
104	7	9	50000.00	pending
\.


--
-- TOC entry 2936 (class 0 OID 16429)
-- Dependencies: 197
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: abiodun
--

COPY public.users (id, email, first_name, last_name, password, address, is_admin) FROM stdin;
1	seller@gmail.com	abija	olebanji	$2b$10$zfYKG.royHsev0XgqV6X1ehw/ygIVA5orqGwwZvDqdGTlb2eOqdxS	16 omolola close	f
4	seller1@gmail.com	abija	olebanji	$2b$10$4jf4TLuR1BUNeoFYBEdmTezGeDztGEYKT/tEskOGbYTnf8h9DbN2a	16 omolola close	f
6	shalom@gmail.com	shalom	adewumi	$2b$10$9fcx6JcP8tjeL0PK3CTAquLgYAMAiDHVo6lGwUthD0q6kf.b7SB1u	18 danbata street	f
86	steheng58@gmail.com	abioduon	oyebanji	$2b$10$0FevTicheghUcYxFl866GOF.LT4xcJfd1Cw5160Ei80aCVz1ZDzSW	13	f
7	temi@gmail.com	temitope	oyebanji	$2b$10$lxqGItKbkQWPZxuGmCCCbeAR.jvxeYYDtWLLWkXm1aoVbgESP1NBG	18 lekki street	t
14	notadmin@gmail.com	abiodun	olebanji	$2b$10$AsnsL9djZvVt6DeLVcanneuDB2GyXn0iVbtfq000FZFWhXNBr62C6	16 omolola close	f
15	steiipheng323@gmail.com	abioduon	oyebanji	$2b$10$EfiY2TJIJ9/w5oQiY5cxxO2v1IzORZk6RLUBmH3Ad81lMzaFRxl06	13	f
20	steipheng323@gmail.com	abioduon	oyebanji	$2b$10$3UnX65D5vpj.gpreyTq13ue6I.Stbqv8MXyL60fgRlR3bKWq5DAOK	13	f
22	stetipheng323@gmail.com	abioduon	oyebanji	$2b$10$M6TPX48iAoKZjjaCaRvJOOwue5J9ftkrG4vqECGf9DGD7XrC1iKMm	13	f
23	stetip9heng323@gmail.com	abioduon	oyebanji	$2b$10$Q5H.mmpNPM48SHzIOyIyqemLWdPSr864Lga8pWSiWbqINWsM.CL/W	13	f
43	steheng32@gmail.com	abioduon	oyebanji	$2b$10$Cd15G0HiUCxWmuslRFyAWe.XyWaZiJHPaKeMfQU7T.zXEFQezvgui	13	f
44	steheng2@gmail.com	abioduon	oyebanji	$2b$10$Uixps8z9ZLYB3MPArLU.AujxEyechhCjYc9rxAaUqgN0S/0yyos9m	13	f
49	steheng25@gmail.com	abioduon	oyebanji	$2b$10$OlEzyttgAfCPyoy0gbQp..ODpHD6LoKtC17FIaT6Q3X5HVN/KWEby	13	f
53	steheng255@gmail.com	abioduon	oyebanji	$2b$10$MD2YLo.LaPqq.5.Bi9DdLOHX.Zp7i3FTIY.NrWN.wRG/F4Y1fcHFm	13	f
56	steheng55@gmail.com	abioduon	oyebanji	$2b$10$WLP2UiUh/qXuRrvEI4wJBOO/AvXwhNVMY9OCbFkVI.Xu4upl9njNO	13	f
69	steheng585@gmail.com	abioduon	oyebanji	$2b$10$Fz10iwCZe3nTGEX/fagz1e71uIYf.apUHf0.TzKxTkGFHxCvrm.cC	13	f
70	steheng59058@gmail.com	abioduon	oyebanji	$2b$10$3Hlu1hcpKJKFHC.GDKBSHex26cBvuaufrMICd12SHGD0iO4Sqd6cW	13	f
129	steheng758@gmail.com	abioduon	oyebanji	$2b$10$5EI1ohab/KPaN.1IzbEyf.5poqz7JL625554KmuJA2zm235ozhAma	13	f
\.


--
-- TOC entry 2949 (class 0 OID 0)
-- Dependencies: 198
-- Name: cars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abiodun
--

SELECT pg_catalog.setval('public.cars_id_seq', 11, true);


--
-- TOC entry 2950 (class 0 OID 0)
-- Dependencies: 200
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abiodun
--

SELECT pg_catalog.setval('public.orders_id_seq', 112, true);


--
-- TOC entry 2951 (class 0 OID 0)
-- Dependencies: 196
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abiodun
--

SELECT pg_catalog.setval('public.users_id_seq', 294, true);


--
-- TOC entry 2807 (class 2606 OID 16532)
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);


--
-- TOC entry 2810 (class 2606 OID 16554)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 2803 (class 2606 OID 16439)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2805 (class 2606 OID 16585)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2808 (class 1259 OID 16628)
-- Name: fki_orders_car_id_fkey; Type: INDEX; Schema: public; Owner: abiodun
--

CREATE INDEX fki_orders_car_id_fkey ON public.orders USING btree (car_id);


--
-- TOC entry 2811 (class 2606 OID 16586)
-- Name: cars cars_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_owner_fkey FOREIGN KEY (owner) REFERENCES public.users(id);


--
-- TOC entry 2812 (class 2606 OID 16591)
-- Name: orders orders_buyer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_buyer_fkey FOREIGN KEY (buyer) REFERENCES public.users(id);


--
-- TOC entry 2813 (class 2606 OID 16623)
-- Name: orders orders_car_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id);


-- Completed on 2019-07-12 17:17:20 GMT

--
-- PostgreSQL database dump complete
--

