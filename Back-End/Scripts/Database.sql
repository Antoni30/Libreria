/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     28/12/2024 19:25:42                          */
/*==============================================================*/


drop index POSSESS2_FK;

drop index BOOK_PK;

drop table BOOK;

drop index POSSESS_FK;

drop index POSSESS3_FK;

drop index BOOKS_CATEGORY_PK;

drop table BOOKS_CATEGORY;

drop index HAS2_FK;

drop index BOOK_SALE_PK;

drop table BOOK_SALE;

drop index CATEGORY_PK;

drop table CATEGORY;

drop index PUBLISHER_PK;

drop table PUBLISHER;

drop index HAS_FK;

drop index HAS4_FK;

drop index SALES_AND_BOOKS_PK;

drop table SALES_AND_BOOKS;

drop index HAS3_FK;

drop index USER_PK;

drop table "USER";

drop index USER_ROLE_PK;

drop table USER_ROLE;

/*==============================================================*/
/* Table: BOOK                                                  */
/*==============================================================*/
create table BOOK (
   ID_BOOK              SERIAL not null,
   ID_PUBLISHER         INT4                 not null,
   BOOK_TITLE           VARCHAR(200)         not null,
   BOOK_AUTHOR          VARCHAR(100)         not null,
   BOOK_ISBN            VARCHAR(13)          not null,
   BOOK_PUBLICATION_YEAR INT4                 null,
   BOOK_QUANTITY_AVAILABLE INT4                 not null,
   BOOK_STATUS          VARCHAR(12)          not null,
   BOOK_COVER_IMAGE     VARCHAR(500)         not null,
   constraint PK_BOOK primary key (ID_BOOK)
);

/*==============================================================*/
/* Index: BOOK_PK                                               */
/*==============================================================*/
create unique index BOOK_PK on BOOK (
ID_BOOK
);

/*==============================================================*/
/* Index: POSSESS2_FK                                           */
/*==============================================================*/
create  index POSSESS2_FK on BOOK (
ID_PUBLISHER
);

/*==============================================================*/
/* Table: BOOKS_CATEGORY                                        */
/*==============================================================*/
create table BOOKS_CATEGORY (
   ID_CATEGORY          INT4                 not null,
   ID_BOOK              INT4                 not null,
   constraint PK_BOOKS_CATEGORY primary key (ID_CATEGORY, ID_BOOK)
);

/*==============================================================*/
/* Index: BOOKS_CATEGORY_PK                                     */
/*==============================================================*/
create unique index BOOKS_CATEGORY_PK on BOOKS_CATEGORY (
ID_CATEGORY,
ID_BOOK
);

/*==============================================================*/
/* Index: POSSESS3_FK                                           */
/*==============================================================*/
create  index POSSESS3_FK on BOOKS_CATEGORY (
ID_BOOK
);

/*==============================================================*/
/* Index: POSSESS_FK                                            */
/*==============================================================*/
create  index POSSESS_FK on BOOKS_CATEGORY (
ID_CATEGORY
);

/*==============================================================*/
/* Table: BOOK_SALE                                             */
/*==============================================================*/
create table BOOK_SALE (
   ID_BOOK_SALE         SERIAL not null,
   ID_USER              INT4                 not null,
   BOOK_SALE_DATE       DATE                 not null,
   BOOK_SALE_QUANTITY_SOLD INT4                 not null,
   BOOK_SALE_UNIT_PRICE MONEY                not null,
   BOOK_TOTAL_SALE      MONEY                not null,
   constraint PK_BOOK_SALE primary key (ID_BOOK_SALE)
);

/*==============================================================*/
/* Index: BOOK_SALE_PK                                          */
/*==============================================================*/
create unique index BOOK_SALE_PK on BOOK_SALE (
ID_BOOK_SALE
);

/*==============================================================*/
/* Index: HAS2_FK                                               */
/*==============================================================*/
create  index HAS2_FK on BOOK_SALE (
ID_USER
);

/*==============================================================*/
/* Table: CATEGORY                                              */
/*==============================================================*/
create table CATEGORY (
   ID_CATEGORY          SERIAL not null,
   CATEGORY_NAME        VARCHAR(50)          not null,
   constraint PK_CATEGORY primary key (ID_CATEGORY)
);

/*==============================================================*/
/* Index: CATEGORY_PK                                           */
/*==============================================================*/
create unique index CATEGORY_PK on CATEGORY (
ID_CATEGORY
);

/*==============================================================*/
/* Table: PUBLISHER                                             */
/*==============================================================*/
create table PUBLISHER (
   ID_PUBLISHER         SERIAL not null,
   PUBLISHER_NAME       VARCHAR(100)         not null,
   PUBLISHER_ADDRESS    VARCHAR(200)         not null,
   PUBLISHER_PHONE      VARCHAR(15)          null,
   PUBLISHER_EMAIL      VARCHAR(100)         null,
   constraint PK_PUBLISHER primary key (ID_PUBLISHER)
);

/*==============================================================*/
/* Index: PUBLISHER_PK                                          */
/*==============================================================*/
create unique index PUBLISHER_PK on PUBLISHER (
ID_PUBLISHER
);

/*==============================================================*/
/* Table: SALES_AND_BOOKS                                       */
/*==============================================================*/
create table SALES_AND_BOOKS (
   ID_BOOK              INT4                 not null,
   ID_BOOK_SALE         INT4                 not null,
   constraint PK_SALES_AND_BOOKS primary key (ID_BOOK, ID_BOOK_SALE)
);

/*==============================================================*/
/* Index: SALES_AND_BOOKS_PK                                    */
/*==============================================================*/
create unique index SALES_AND_BOOKS_PK on SALES_AND_BOOKS (
ID_BOOK,
ID_BOOK_SALE
);

/*==============================================================*/
/* Index: HAS4_FK                                               */
/*==============================================================*/
create  index HAS4_FK on SALES_AND_BOOKS (
ID_BOOK_SALE
);

/*==============================================================*/
/* Index: HAS_FK                                                */
/*==============================================================*/
create  index HAS_FK on SALES_AND_BOOKS (
ID_BOOK
);

/*==============================================================*/
/* Table: "USER"                                                */
/*==============================================================*/
create table "USER" (
   ID_USER              SERIAL not null,
   ID_USER_ROLE         INT4                 not null,
   USER_FULLNAME        VARCHAR(150)         not null,
   USER_EMAIL           VARCHAR(100)         not null,
   USER_PASSWORD        VARCHAR(16)          not null,
   USER_PHONE           VARCHAR(10)          null,
   USER_REGISTRATION_DATE DATE                 not null,
   constraint PK_USER primary key (ID_USER)
);

/*==============================================================*/
/* Index: USER_PK                                               */
/*==============================================================*/
create unique index USER_PK on "USER" (
ID_USER
);

/*==============================================================*/
/* Index: HAS3_FK                                               */
/*==============================================================*/
create  index HAS3_FK on "USER" (
ID_USER_ROLE
);

/*==============================================================*/
/* Table: USER_ROLE                                             */
/*==============================================================*/
create table USER_ROLE (
   ID_USER_ROLE         SERIAL not null,
   USER_ROLE_NAME       VARCHAR(50)          not null,
   constraint PK_USER_ROLE primary key (ID_USER_ROLE)
);

/*==============================================================*/
/* Index: USER_ROLE_PK                                          */
/*==============================================================*/
create unique index USER_ROLE_PK on USER_ROLE (
ID_USER_ROLE
);

alter table BOOK
   add constraint FK_BOOK_POSSESS2_PUBLISHE foreign key (ID_PUBLISHER)
      references PUBLISHER (ID_PUBLISHER)
      on delete restrict on update restrict;

alter table BOOKS_CATEGORY
   add constraint FK_BOOKS_CA_POSSESS_CATEGORY foreign key (ID_CATEGORY)
      references CATEGORY (ID_CATEGORY)
      on delete restrict on update restrict;

alter table BOOKS_CATEGORY
   add constraint FK_BOOKS_CA_POSSESS3_BOOK foreign key (ID_BOOK)
      references BOOK (ID_BOOK)
      on delete restrict on update restrict;

alter table BOOK_SALE
   add constraint FK_BOOK_SAL_HAS2_USER foreign key (ID_USER)
      references "USER" (ID_USER)
      on delete restrict on update restrict;

alter table SALES_AND_BOOKS
   add constraint FK_SALES_AN_HAS_BOOK foreign key (ID_BOOK)
      references BOOK (ID_BOOK)
      on delete restrict on update restrict;

alter table SALES_AND_BOOKS
   add constraint FK_SALES_AN_HAS4_BOOK_SAL foreign key (ID_BOOK_SALE)
      references BOOK_SALE (ID_BOOK_SALE)
      on delete restrict on update restrict;

alter table "USER"
   add constraint FK_USER_HAS3_USER_ROL foreign key (ID_USER_ROLE)
      references USER_ROLE (ID_USER_ROLE)
      on delete restrict on update restrict;

