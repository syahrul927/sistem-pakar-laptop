# Sistem Pakar

---

## Stack

Project ini dibuat dengan standard tech 2023 starter kit t3-stack

### Umum

1. Framework Full Stack Nextjs
2. Database Postgresql
3. Bahasa Typescript

### Just FYI

4. Postgresql by supabase (penyedia postgres cloud gratis )
5. tRpc
6. Tailwindcss
7. NextAuth & OAuth (untuk login with google, github, atau facebook dll)
8. Prisma ORM Database

## Schema Database

![[ERD.svg]]

```prismjs
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

generator erd {
    provider = "prisma-erd-generator"
    output = "../ERD.svg"
}

datasource db {
  provider = "postgresql"
  // NOTE: When using postgresql, mysql or sqlserver, uncomment the @db.Text annotations in model Account below
  // Further reading:
  // https://next-auth.js.org/adapters/prisma#create-the-prisma-schema
  // https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#string
  url      = env("DATABASE_URL")
}

// Necessary for Next auth
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? // @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id              String            @id @default(cuid())
  name            String?
  email           String?           @unique
  emailVerified   DateTime?
  image           String?
  accounts        Account[]
  sessions        Session[]
  HistoryDiagnosa HistoryDiagnosa[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// Tabel Kasus
model Case {
  id          Int           @id @default(autoincrement())
  problem     String
  solution    String
  computer    String
  date        DateTime
  CaseSymptom CaseSymptom[]
  CaseFeature CaseFeature[]
}

// Tabel Fitur
model Feature {
  id                Int              @id @default(autoincrement())
  name              String
  type              String
  description       String
  FeatureSymptom    FeatureSymptom[]
  CaseFeature       CaseFeature[]
  HistoryDiagnosa   HistoryDiagnosa? @relation(fields: [historyDiagnosaId], references: [id])
  historyDiagnosaId Int?
}

// Tabel Gejala
model Symptom {
  id                Int              @id @default(autoincrement())
  description       String
  type              String
  weight            Float
  CaseSymptom       CaseSymptom[]
  FeatureSymptom    FeatureSymptom[]
  HistoryDiagnosa   HistoryDiagnosa? @relation(fields: [historyDiagnosaId], references: [id])
  historyDiagnosaId Int?
}

// Tabel Korelasi Kasus-Gejala
model CaseSymptom {
  id        Int     @id @default(autoincrement())
  caseId    Int
  symptomId Int
  case      Case    @relation(fields: [caseId], references: [id])
  symptom   Symptom @relation(fields: [symptomId], references: [id])
}

// Tabel Korelasi Fitur-Gejala
model FeatureSymptom {
  id        Int     @id @default(autoincrement())
  featureId Int
  symptomId Int
  feature   Feature @relation(fields: [featureId], references: [id])
  symptom   Symptom @relation(fields: [symptomId], references: [id])
}

// Tabel Korelasi Fitur-Kasus
model CaseFeature {
  id        Int     @id @default(autoincrement())
  caseId    Int
  featureId Int
  case      Case    @relation(fields: [caseId], references: [id])
  feature   Feature @relation(fields: [featureId], references: [id])
}

// Tabel HistoryDiagnosa
model HistoryDiagnosa {
  id       Int       @id @default(autoincrement())
  user     User?     @relation(fields: [userId], references: [id])
  userId   String?
  date     DateTime  @default(now())
  problem  String
  solution String
  computer String
  features Feature[]
  symptoms Symptom[]
}

```
