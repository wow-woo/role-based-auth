import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/users/entities/user.entity";

type roleName = keyof typeof UserRole | 'Any'

export function Role (roleName:roleName[]){
    return SetMetadata<string, roleName[]>('roles', roleName)
}