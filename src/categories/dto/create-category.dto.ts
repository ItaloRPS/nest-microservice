import { Category } from "@prisma/client";

export class CreateCategoryDto implements Category  {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
