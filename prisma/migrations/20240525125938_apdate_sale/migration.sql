-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agreement" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateOfStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfEnd" TIMESTAMP(3) NOT NULL,
    "saleId" INTEGER NOT NULL,

    CONSTRAINT "Agreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "agreementId" INTEGER,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FurnitureModel" (
    "id" SERIAL NOT NULL,
    "saleId" INTEGER,
    "furnitureName" TEXT NOT NULL,
    "furnitureType" TEXT NOT NULL,
    "Property" TEXT NOT NULL,
    "Price" INTEGER NOT NULL,

    CONSTRAINT "FurnitureModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Agreement_saleId_key" ON "Agreement"("saleId");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_agreementId_key" ON "Sale"("agreementId");

-- AddForeignKey
ALTER TABLE "Agreement" ADD CONSTRAINT "Agreement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agreement" ADD CONSTRAINT "Agreement_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FurnitureModel" ADD CONSTRAINT "FurnitureModel_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
