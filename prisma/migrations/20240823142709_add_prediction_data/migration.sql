/*
  Warnings:

  - Added the required column `predictionText` to the `Summaries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `predictionUrl` to the `Summaries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Summaries" ADD COLUMN     "predictionText" TEXT NOT NULL,
ADD COLUMN     "predictionUrl" TEXT NOT NULL;
