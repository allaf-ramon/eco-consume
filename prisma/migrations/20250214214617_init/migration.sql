-- CreateTable
CREATE TABLE "ConsumerUnitEconomies" (
    "id" INTEGER NOT NULL,
    "consumer_unit" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "month_ref" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "economy_value" DOUBLE PRECISION NOT NULL,
    "power_distribution_unit_bill_value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ConsumerUnitEconomies_pkey" PRIMARY KEY ("id")
);
