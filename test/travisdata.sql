--
-- PostgreSQL database dump
--

-- Dumped from database version 10.8 (Ubuntu 10.8-1.pgdg18.04+1)
-- Dumped by pg_dump version 11.3 (Ubuntu 11.3-1.pgdg18.04+1)

-- Started on 2019-08-08 07:58:28 GMT

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
-- TOC entry 196 (class 1259 OID 16812)
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
    image_url character varying(200),
    manufacturer character varying(50) NOT NULL
);


ALTER TABLE public.cars OWNER TO abiodun;

--
-- TOC entry 197 (class 1259 OID 16818)
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
-- TOC entry 2948 (class 0 OID 0)
-- Dependencies: 197
-- Name: cars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abiodun
--

ALTER SEQUENCE public.cars_id_seq OWNED BY public.cars.id;


--
-- TOC entry 198 (class 1259 OID 16820)
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
-- TOC entry 199 (class 1259 OID 16826)
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
-- TOC entry 2949 (class 0 OID 0)
-- Dependencies: 199
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abiodun
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 200 (class 1259 OID 16828)
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
-- TOC entry 201 (class 1259 OID 16834)
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
-- TOC entry 2950 (class 0 OID 0)
-- Dependencies: 201
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abiodun
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2799 (class 2604 OID 16865)
-- Name: cars id; Type: DEFAULT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.cars ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);


--
-- TOC entry 2800 (class 2604 OID 16866)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 2801 (class 2604 OID 16867)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2937 (class 0 OID 16812)
-- Dependencies: 196
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: abiodun
--

COPY public.cars (id, owner, created_on, state, status, price, model, body_type, image_url, manufacturer) FROM stdin;
12	6	2019-07-13 01:15:10.419+00	new	available	120000	crosstour	car	https://res.cloudinary.com/stepheng323/image/upload/v1562976964/yz1iomzgzl67auoqcivi.jpg	honda
34	1	2019-07-15 20:16:21.396+00	used	available	150000	wagon	Truck\n	https://res.cloudinary.com/stepheng323/image/upload/v1563218238/i2novq0mgnglhudykfsp.jpg	mach
36	7	2019-07-19 09:45:46.628+00	used	available	150000	wagon	Truck\n	\N	mach
13	1	2019-07-13 23:11:42.896+00	used	available	90000	corolla	car	https://res.cloudinary.com/stepheng323/image/upload/v1563055957/ednwhnphkbybotkfew0l.jpg	toyota
14	7	2019-07-13 23:48:20.566+00	used	available	50000	camry	car	https://res.cloudinary.com/stepheng323/image/upload/v1563058155/yn79c7t9eavlj22cv84u.jpg	toyota
15	7	2019-07-13 23:50:10.337+00	used	available	50000	camry	car	https://res.cloudinary.com/stepheng323/image/upload/v1563058265/hwjztq5a6bgnbikjvi0s.jpg	toyota
16	7	2019-07-13 23:56:01.868+00	used	available	50000	camry	car	https://res.cloudinary.com/stepheng323/image/upload/v1563058616/ybndhbiaythafatfixjd.jpg	toyota
17	7	2019-07-14 00:01:38.349+00	used	available	50000	camry	car	https://res.cloudinary.com/stepheng323/image/upload/v1563058953/kw5da4airjcfb3jvw2i6.jpg	toyota
18	1	2019-07-14 07:29:47.63+00	used	available	120000	crosstour	van	https://res.cloudinary.com/stepheng323/image/upload/v1563085843/kiqgkfwdmiwpumlqjaif.jpg	ford
20	1	2019-07-14 07:44:10.041+00	used	available	120000	crosstour	van	https://res.cloudinary.com/stepheng323/image/upload/v1563086705/hnxpm80ls1mtnv5hfecz.jpg	ford
24	1	2019-07-14 10:27:02.826+00	used	available	120000	crosstour	van	\N	ford
26	1	2019-07-14 10:37:44.695+00	used	available	120000	crosstour	van		ford
27	1	2019-07-14 10:39:01.341+00	used	available	120000	crosstour	van	https://res.cloudinary.com/stepheng323/image/upload/v1563097196/ud9cmns7xw5yu0ntuwlz.jpg	ford
29	1	2019-07-14 10:40:10.727+00	used	available	120000	crosstour	van	\N	ford
10	7	2019-06-21 00:00:00+00	new	sold	70000	wrangler	car	https://res.cloudinary.com/stepheng323/image/upload/v1561114507/lej5gecia2jz1lznifuo.jpg	jeep
37	335	2019-07-23 11:39:46.752+00	new	available	250000	300	car\n	\N	lexus
25	1	2019-07-14 10:27:24.688+00	used	available	120000	crosstour	van	\N	ford
30	7	2019-07-15 13:17:20.297+00	used	available	50000	camry	car	https://res.cloudinary.com/stepheng323/image/upload/v1563193096/r2zrrobo4oeevftedmks.jpg	toyota
28	1	2019-07-14 10:39:57.66+00	used	available	120000	crosstour	van	https://res.cloudinary.com/stepheng323/image/upload/v1563097251/b77cdliitxu2w0nt6ovq.jpg	ford
33	1	2019-07-15 20:14:47.079+00	used	available	150000	wagon	van	\N	volvo
32	7	2019-07-15 13:34:51.459+00	used	available	50000	camry	car	https://res.cloudinary.com/stepheng323/image/upload/v1563194147/ymg5rjn9rk1aqsjpm44f.jpg	toyota
45	7	2019-08-01 14:46:41.752+00	new	available	250000	camry	car\n	\N	toyota
\.


--
-- TOC entry 2939 (class 0 OID 16820)
-- Dependencies: 198
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: abiodun
--

COPY public.orders (id, buyer, car_id, amount, status) FROM stdin;
22	6	10	10000.00	pending
159	7	25	250000	pending
160	7	12	250000	pending
161	7	36	250000	pending
162	7	32	250000	pending
163	7	30	1800000	pending
164	7	20	250000	pending
165	7	37	50000	pending
23	7	34	70000	pending
145	335	10	290000	pending
155	7	10	250000	pending
\.


--
-- TOC entry 2941 (class 0 OID 16828)
-- Dependencies: 200
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: abiodun
--

COPY public.users (id, email, first_name, last_name, password, address, is_admin) FROM stdin;
1	seller@gmail.com	kate	oyebanji	$2b$10$zfYKG.royHsev0XgqV6X1ehw/ygIVA5orqGwwZvDqdGTlb2eOqdxS	16 omolola close	f
4	seller1@gmail.com	steve	oyebanji	$2b$10$4jf4TLuR1BUNeoFYBEdmTezGeDztGEYKT/tEskOGbYTnf8h9DbN2a	16 omolola close	f
6	shalom@gmail.com	shalom	adewumi	$2b$10$9fcx6JcP8tjeL0PK3CTAquLgYAMAiDHVo6lGwUthD0q6kf.b7SB1u	18 danbata street	f
86	steheng58@gmail.com	henry	oyebanji	$2b$10$0FevTicheghUcYxFl866GOF.LT4xcJfd1Cw5160Ei80aCVz1ZDzSW	13	f
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
298	henyhart@swellview.com	henry	hart	$2b$10$76wKxoK23i7j6fCHv/xmweW4uHCfKs/1WASEVqB3v3BbJ1wnQMn0.	2345 avenue mancave swellview	f
300	henyhart23@swellview.com	henry	hart	$2b$10$NJSsdg3Y7afZRHiBSxqc2uMuYfGNelKbSINrqFi3ce1ziOxEGw1uq	2345 avenue mancave swellview	f
301	henyhart29@swellview.com	henry	hart	$2b$10$MuqFLhluMdSvYBRBm0KIz.3..9TtBBQwsJeLF.WpvlEf3Vvpb.0pq	2345 avenue mancave swellview	f
318	henyhart52@swellview.com	henry	hart	$2b$10$UZ6z6KUVXLSzkl2Bh89TFuFs0tEtHS88J6YlF4VE3WWEG13Eih0DG	2345 avenue mancave swellview	f
320	piper@gmail.com	piper	hart	$2b$10$k8MEk.x0.6d/4.QiiMDUlesiV9bg.8EUktNm2YFyze8iayhFgFLU2	16 omolola close	f
335	ricky@gmail.com	ricky	harper	$2b$10$4RlWzYjof31GD1Z9ux8.Su.jPbpRuSJb.Tu4YdDf2OHnTdwzIi3Sy	16 omolola close	f
336	dawn@gmail.com	dawn	harper	$2b$10$XLsw0O/DQER/UB814mcKOu5z/14KvTyQotpJ8S5pX29/EFWax.3yW	16 omolola close	f
337	nicky@gmail.com	nicky	harper	$2b$10$m9tK8nVZOKJzZ/WUSSziqe8/sr02klC74.KeQ4VqoujluoCpgA31y	16 omolola close	f
339	rajes@gmail.com	rajes	kuthrapoli	$2b$10$vTfWSM2FS3hntdoqHkxoNe3/aFi5MyVAOJYg0ZigxcLGHh47BgR1W	16 omolola close	f
340	henyhart582@swellview.com	henry	hart	$2b$10$5./GkAt8yjFzQvAb0.mKC.q4gCCcFN6YxgEu//JCj3N2l5SNsKMKm	2345 avenue mancave swellview	f
\.


--
-- TOC entry 2951 (class 0 OID 0)
-- Dependencies: 197
-- Name: cars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abiodun
--

SELECT pg_catalog.setval('public.cars_id_seq', 45, true);


--
-- TOC entry 2952 (class 0 OID 0)
-- Dependencies: 199
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abiodun
--

SELECT pg_catalog.setval('public.orders_id_seq', 165, true);


--
-- TOC entry 2953 (class 0 OID 0)
-- Dependencies: 201
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abiodun
--

SELECT pg_catalog.setval('public.users_id_seq', 340, true);


--
-- TOC entry 2803 (class 2606 OID 16840)
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);


--
-- TOC entry 2808 (class 2606 OID 16842)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 2810 (class 2606 OID 16844)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2812 (class 2606 OID 16846)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2805 (class 1259 OID 16847)
-- Name: fki_orders_buyer_fkey; Type: INDEX; Schema: public; Owner: abiodun
--

CREATE INDEX fki_orders_buyer_fkey ON public.orders USING btree (buyer);


--
-- TOC entry 2806 (class 1259 OID 16848)
-- Name: fki_orders_car_id_fkey; Type: INDEX; Schema: public; Owner: abiodun
--

CREATE INDEX fki_orders_car_id_fkey ON public.orders USING btree (car_id);


--
-- TOC entry 2804 (class 1259 OID 16849)
-- Name: fki_owner_fk; Type: INDEX; Schema: public; Owner: abiodun
--

CREATE INDEX fki_owner_fk ON public.cars USING btree (owner);


--
-- TOC entry 2814 (class 2606 OID 16850)
-- Name: orders orders_buyer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_buyer_fkey FOREIGN KEY (buyer) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2815 (class 2606 OID 16855)
-- Name: orders orders_car_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2813 (class 2606 OID 16860)
-- Name: cars owner_fk; Type: FK CONSTRAINT; Schema: public; Owner: abiodun
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT owner_fk FOREIGN KEY (owner) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2019-08-08 07:58:29 GMT

--
-- PostgreSQL database dump complete
--

