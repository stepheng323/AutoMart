--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4 (Ubuntu 11.4-1.pgdg16.04+1)
-- Dumped by pg_dump version 11.3 (Ubuntu 11.3-1.pgdg18.04+1)

-- Started on 2019-07-15 14:12:16 GMT

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
-- TOC entry 196 (class 1259 OID 3834817)
-- Name: cars; Type: TABLE; Schema: public; Owner: owxxiojqpvmffq
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


ALTER TABLE public.cars OWNER TO owxxiojqpvmffq;

--
-- TOC entry 197 (class 1259 OID 3834823)
-- Name: cars_id_seq; Type: SEQUENCE; Schema: public; Owner: owxxiojqpvmffq
--

CREATE SEQUENCE public.cars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cars_id_seq OWNER TO owxxiojqpvmffq;

--
-- TOC entry 3866 (class 0 OID 0)
-- Dependencies: 197
-- Name: cars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: owxxiojqpvmffq
--

ALTER SEQUENCE public.cars_id_seq OWNED BY public.cars.id;


--
-- TOC entry 198 (class 1259 OID 3834825)
-- Name: orders; Type: TABLE; Schema: public; Owner: owxxiojqpvmffq
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    buyer integer NOT NULL,
    car_id integer NOT NULL,
    amount numeric NOT NULL,
    status character varying(20) NOT NULL
);


ALTER TABLE public.orders OWNER TO owxxiojqpvmffq;

--
-- TOC entry 199 (class 1259 OID 3834831)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: owxxiojqpvmffq
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO owxxiojqpvmffq;

--
-- TOC entry 3867 (class 0 OID 0)
-- Dependencies: 199
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: owxxiojqpvmffq
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 200 (class 1259 OID 3834833)
-- Name: users; Type: TABLE; Schema: public; Owner: owxxiojqpvmffq
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


ALTER TABLE public.users OWNER TO owxxiojqpvmffq;

--
-- TOC entry 201 (class 1259 OID 3834839)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: owxxiojqpvmffq
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO owxxiojqpvmffq;

--
-- TOC entry 3868 (class 0 OID 0)
-- Dependencies: 201
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: owxxiojqpvmffq
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3716 (class 2604 OID 3834841)
-- Name: cars id; Type: DEFAULT; Schema: public; Owner: owxxiojqpvmffq
--

ALTER TABLE ONLY public.cars ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);


--
-- TOC entry 3717 (class 2604 OID 3834842)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: owxxiojqpvmffq
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3718 (class 2604 OID 3834843)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: owxxiojqpvmffq
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3854 (class 0 OID 3834817)
-- Dependencies: 196
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: owxxiojqpvmffq
--

COPY public.cars (id, owner, created_on, state, status, price, model, body_type, image_url, manufacturer) FROM stdin;
12	6	2019-07-13 01:15:10.419+00	new	available	120000	crosstour	car	https://res.cloudinary.com/stepheng323/image/upload/v1562976964/yz1iomzgzl67auoqcivi.jpg	honda
10	7	2019-06-21 00:00:00+00	new	sold	70000	wrangler	car	https://res.cloudinary.com/stepheng323/image/upload/v1561114507/lej5gecia2jz1lznifuo.jpg	jeep
13	1	2019-07-13 23:11:42.896+00	used	available	90000	corolla	car	https://res.cloudinary.com/stepheng323/image/upload/v1563055957/ednwhnphkbybotkfew0l.jpg	toyota
14	7	2019-07-13 23:48:20.566+00	used	available	50000	camry	car	https://res.cloudinary.com/stepheng323/image/upload/v1563058155/yn79c7t9eavlj22cv84u.jpg	toyota
15	7	2019-07-13 23:50:10.337+00	used	available	50000	camry	car	https://res.cloudinary.com/stepheng323/image/upload/v1563058265/hwjztq5a6bgnbikjvi0s.jpg	toyota
18	1	2019-07-14 07:29:47.63+00	used	available	120000	crosstour	van	https://res.cloudinary.com/stepheng323/image/upload/v1563085843/kiqgkfwdmiwpumlqjaif.jpg	ford
20	1	2019-07-14 07:44:10.041+00	used	available	120000	crosstour	van	https://res.cloudinary.com/stepheng323/image/upload/v1563086705/hnxpm80ls1mtnv5hfecz.jpg	ford
21	1	2019-07-14 07:48:29.214+00	used	available	120000	crosstour	van	https://res.cloudinary.com/stepheng323/image/upload/v1563086964/n2dcxd9ooivkjti96ov2.jpg	ford
22	305	2019-07-14 09:44:22.612+00	new	sold	1500000	Camry	car	\N	Toyota
23	306	2019-07-14 09:45:10.43+00	new	available	1500000	Camry	car	\N	Toyota
45	328	2019-07-14 23:04:38.078+00	new	sold	500000	Camry	car	\N	Toyota
30	313	2019-07-14 20:33:31.468+00	new	sold	1500000	Camry	car	\N	Toyota
17	7	2019-07-14 00:01:38.349+00	used	available	11000	camry	car	https://res.cloudinary.com/stepheng323/image/upload/v1563058953/kw5da4airjcfb3jvw2i6.jpg	toyota
16	7	2019-07-13 23:56:01.868+00	used	available	11000	camry	car	https://res.cloudinary.com/stepheng323/image/upload/v1563058616/ybndhbiaythafatfixjd.jpg	toyota
\.


--
-- TOC entry 3856 (class 0 OID 3834825)
-- Dependencies: 198
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: owxxiojqpvmffq
--

COPY public.orders (id, buyer, car_id, amount, status) FROM stdin;
22	6	10	10000.00	pending
23	7	10	12000.00	pending
24	7	10	12000.00	pending
25	7	10	12000.00	pending
118	7	12	50000	pending
119	7	12	50000	pending
117	7	12	70000	pending
120	305	22	1000000	pending
121	306	23	1000000	pending
128	313	30	1000000	pending
143	328	45	1000000	pending
\.


--
-- TOC entry 3858 (class 0 OID 3834833)
-- Dependencies: 200
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: owxxiojqpvmffq
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
304	S4LVV@S4LVV.com	firstNAme	lastName	$2b$10$sJIjna3Hq5CXi0LS70.nzO32tfuSM/1SURwg9eYsLgA76gGSpJapa	lagos, Nigeria	f
305	FNWva@FNWva.com	firstNAme	lastName	$2b$10$ETlrhGgfNe8jsQjHTYQ/Ieey5ON1kZqKbYtecea.2zGo.OuSUF3qK	lagos, Nigeria	f
306	tdyYq@tdyYq.com	firstNAme	lastName	$2b$10$eXw1yGpop1XVGE.j.2HM9OFinrJJmwmQkhuGoDibZUMsXVdfxrOCa	lagos, Nigeria	f
307	eqioy@eqioy.com	firstNAme	lastName	$2b$10$Wigdbx.kERlEerz3JefUt.RcYZkp8t7f6i5.qJeA8me9TIRvwMuCi	lagos, Nigeria	f
308	J6QS2@J6QS2.com	firstNAme	lastName	$2b$10$k1i.rcdZKyZgNnaOVeerKeSizHFhLRl21ICxzXyXy5e2paXaS.ZCG	lagos, Nigeria	f
309	dBP4u@dBP4u.com	firstNAme	lastName	$2b$10$GX4pN20.05XDFv/gCa1ijOFkXuPnmAmyvixhqbmkI1xIjX01C3lcy	lagos, Nigeria	f
310	gnGPs@gnGPs.com	firstNAme	lastName	$2b$10$oCm4/dvXn2t4UWkeAivfn.U5qTIfcVEa4C9WjFpMdVUZdanxmfmo6	lagos, Nigeria	f
311	MHiCy@MHiCy.com	firstNAme	lastName	$2b$10$lJ7DPo0n0UdXczDHGBElMunH.WbZaBs/Hq8FxRAkFh4H5AYE.ahYu	lagos, Nigeria	f
312	4SXoD@4SXoD.com	firstNAme	lastName	$2b$10$EuY.Bg44KPKxRaJ4.BAJq.F3DVCFlREU0VquI6Bf/gT.XXv/DDVVK	lagos, Nigeria	f
313	SkOes@SkOes.com	firstNAme	lastName	$2b$10$jV9h4npqb45ZnQfgv7u4z.6H8zfUQS7Tdm5yC5XcfMMDJVTd7kkBy	lagos, Nigeria	f
314	bznYW@bznYW.com	firstNAme	lastName	$2b$10$fXq0O8oWFLHga4g6xaxU5epKR1WD.GxJOFF6oAJ6Vfd3J2LEUWlXW	lagos, Nigeria	f
315	0eZyG@0eZyG.com	firstNAme	lastName	$2b$10$Vva0KpHKINGjiq9BfXZYIeb2CbxNRhhzdphrChyZMZDCYRjEH8gI6	lagos, Nigeria	f
316	NIbDO@NIbDO.com	firstNAme	lastName	$2b$10$peU88TMaE9rvOUth/HoFJumsQ2ZTmtC9GXjYzb1s/l8.XVY8bkJuC	lagos, Nigeria	f
317	CvNvI@CvNvI.com	firstNAme	lastName	$2b$10$8EdmCvGQbWuZl4OhVA8Dp.jrbBLGUs2do85NS.4Yvp8qnfkJijHl6	lagos, Nigeria	f
318	lTHKp@lTHKp.com	firstNAme	lastName	$2b$10$IWyhlNC4D7bgHAwHYGJS6OPVEguBRxP2vT0OoMr.UNEL2GXhPUgJm	lagos, Nigeria	f
319	bwoUU@bwoUU.com	firstNAme	lastName	$2b$10$MoJ5vhoW6bboyZ.flGAiuuissqVIYH1PxY0Y/UTymfwQsPHZFp6be	lagos, Nigeria	f
320	PuYgO@PuYgO.com	firstNAme	lastName	$2b$10$DZiaimYLnBdUEG8t5dXvtuxI3Q/YHSlXOFNdcu0ZHK0zz9qIASikO	lagos, Nigeria	f
321	hJ5tQ@hJ5tQ.com	firstNAme	lastName	$2b$10$QuKKNqAkV/WQ7ai.5AJf0O2j0AQkkSpVmKHPKgFEk2f0Oqs7Ez0Ii	lagos, Nigeria	f
322	fqSI2@fqSI2.com	firstNAme	lastName	$2b$10$qnfhKOx9VRDXshnD8kd/o.Czztq9qwsSUYTcI17TQwQNOGmunsGuW	lagos, Nigeria	f
323	K6yBb@K6yBb.com	firstNAme	lastName	$2b$10$P5OjPP/xaN/fsNzNfxWx8.78RZe3C2Ocmzdq0DMeUIkmZLIDImABe	lagos, Nigeria	f
324	tbnE1@tbnE1.com	firstNAme	lastName	$2b$10$JOE6Bu00qlTb9OGYgIM1U.uMef0Sj0EBGwmi5bET0OQExBpFwZnZW	lagos, Nigeria	f
325	AO8GQ@AO8GQ.com	firstNAme	lastName	$2b$10$Lw.opTDYxMvKmkZqnh0ZhOSGEcLZ7lE09b8Dkq9gbjLPGpJBEKf76	lagos, Nigeria	f
326	Cd9WZ@Cd9WZ.com	firstNAme	lastName	$2b$10$djiTBElBVQa5L.DLLCtTLe7Bl6NwRO5KvKIQ/cy/uZdYMvljAaDGK	lagos, Nigeria	f
327	UOSFl@UOSFl.com	firstNAme	lastName	$2b$10$FOqj2KsIEfFua6DDqIPJJOk1FoebZTlLbH0uEsHmaz7NUH3fDmH0S	lagos, Nigeria	f
328	xO3X0@xO3X0.com	firstNAme	lastName	$2b$10$I0Ic3pCe.9gBxImyD2phPO1bKPpntVM5YsZkNHA9FVnOx25DiTVP6	lagos, Nigeria	f
329	DWHm3@DWHm3.com	firstNAme	lastName	$2b$10$1lu9G74zjJDSaJgBrUdtL.G8U0ldjy54o0KyYag6GcgOre3W3XuhS	lagos, Nigeria	f
330	ehMXb@ehMXb.com	firstNAme	lastName	$2b$10$8roXnuO6TDmBKMZqWwcgt.md84mNkno.WtnjRmw6O9mWvC3k.P/zi	lagos, Nigeria	f
331	mVDqz@mVDqz.com	firstNAme	lastName	$2b$10$31YQxNe8zsHAAw1L94Eic.5gP1DLWFa7VaauXOU5gHD6uz733Em1a	lagos, Nigeria	f
\.


--
-- TOC entry 3869 (class 0 OID 0)
-- Dependencies: 197
-- Name: cars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: owxxiojqpvmffq
--

SELECT pg_catalog.setval('public.cars_id_seq', 48, true);


--
-- TOC entry 3870 (class 0 OID 0)
-- Dependencies: 199
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: owxxiojqpvmffq
--

SELECT pg_catalog.setval('public.orders_id_seq', 146, true);


--
-- TOC entry 3871 (class 0 OID 0)
-- Dependencies: 201
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: owxxiojqpvmffq
--

SELECT pg_catalog.setval('public.users_id_seq', 331, true);


--
-- TOC entry 3720 (class 2606 OID 3834845)
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: owxxiojqpvmffq
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);


--
-- TOC entry 3725 (class 2606 OID 3834847)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: owxxiojqpvmffq
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3727 (class 2606 OID 3834849)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: owxxiojqpvmffq
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3729 (class 2606 OID 3834851)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: owxxiojqpvmffq
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3722 (class 1259 OID 3834852)
-- Name: fki_orders_buyer_fkey; Type: INDEX; Schema: public; Owner: owxxiojqpvmffq
--

CREATE INDEX fki_orders_buyer_fkey ON public.orders USING btree (buyer);


--
-- TOC entry 3723 (class 1259 OID 3834853)
-- Name: fki_orders_car_id_fkey; Type: INDEX; Schema: public; Owner: owxxiojqpvmffq
--

CREATE INDEX fki_orders_car_id_fkey ON public.orders USING btree (car_id);


--
-- TOC entry 3721 (class 1259 OID 3834854)
-- Name: fki_owner_fk; Type: INDEX; Schema: public; Owner: owxxiojqpvmffq
--

CREATE INDEX fki_owner_fk ON public.cars USING btree (owner);


--
-- TOC entry 3731 (class 2606 OID 3834855)
-- Name: orders orders_buyer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: owxxiojqpvmffq
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_buyer_fkey FOREIGN KEY (buyer) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3732 (class 2606 OID 3834860)
-- Name: orders orders_car_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: owxxiojqpvmffq
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3730 (class 2606 OID 3834865)
-- Name: cars owner_fk; Type: FK CONSTRAINT; Schema: public; Owner: owxxiojqpvmffq
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT owner_fk FOREIGN KEY (owner) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3865 (class 0 OID 0)
-- Dependencies: 609
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO owxxiojqpvmffq;


-- Completed on 2019-07-15 14:12:55 GMT

--
-- PostgreSQL database dump complete
--

