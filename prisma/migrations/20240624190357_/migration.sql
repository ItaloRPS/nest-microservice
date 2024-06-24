/*
  Warnings:

  - Added the required column `status` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` DOUBLE NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `hash` VARCHAR(191) NOT NULL DEFAULT uuid();
