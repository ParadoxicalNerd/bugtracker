/*
  Warnings:

  - You are about to drop the column `ofType` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ofType` on the `User` table. All the data in the column will be lost.
  - Added the required column `type` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `priority` on the `Ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicketTypes" AS ENUM ('BUG', 'FEATURE', 'DOCS');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'ASSIGNED', 'TESTING', 'RESOLVED');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('UNKNOWN', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'PROJECT_MANAGER', 'PROGRAMMER', 'TESTER');

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "ofType",
ADD COLUMN     "type" "TicketTypes" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TicketStatus" NOT NULL,
DROP COLUMN "priority",
ADD COLUMN     "priority" "TicketPriority" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ofType",
ADD COLUMN     "type" "UserType" NOT NULL;
