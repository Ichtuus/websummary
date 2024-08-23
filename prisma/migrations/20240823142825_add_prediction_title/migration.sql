/*
  Warnings:

  - Added the required column `predictionTitle` to the `Summaries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Summaries" ADD COLUMN     "predictionTitle" TEXT NOT NULL;
