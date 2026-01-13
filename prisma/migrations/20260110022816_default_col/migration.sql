-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'pending',
ALTER COLUMN "priority" SET DEFAULT 'low';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'member';
