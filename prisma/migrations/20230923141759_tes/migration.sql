-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "asset_url" TEXT,
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'lainnya',
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "payment_method" TEXT NOT NULL DEFAULT 'dp';
