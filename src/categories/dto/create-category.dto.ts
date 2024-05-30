import { Category } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto implements Category  {
    id: number;

    @IsString({ message: 'the name must be a string.' })
    @IsNotEmpty({ message: 'the name must not be a null.' })
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
