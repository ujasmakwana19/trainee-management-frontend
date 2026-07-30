import { RoutePath } from "./route.constant"
import { UserRole } from "./services/auth/auth.model"

type PermissionHash = {
    [key : string] : UserRole[]
}

export const AuthorisePermission  : PermissionHash = {
    [RoutePath.TRAINEEBASE] : [UserRole.Mentor, UserRole.Admin] ,
    [RoutePath.MENTORBASE] : [] ,
    [RoutePath.TASKBASE] : [] ,
    [RoutePath.SUBMISSIONBASE] : [],
    [RoutePath.REVIEWBASE] :  [],


    [RoutePath.USERPROFILEBASE] : [],
    [RoutePath.HOME] : []
}

