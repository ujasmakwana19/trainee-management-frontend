import { RoutePath } from "./route.constant"
import { UserRole } from "./services/auth/auth.model"

type PermissionHash = {
    [key : string] : UserRole[]
}

export const AuthorisePermission  : PermissionHash = {
    [RoutePath.TRAINEE_BASE] : [UserRole.Mentor, UserRole.Admin] ,
    [RoutePath.MENTOR_BASE] : [UserRole.Mentor, UserRole.Admin] ,
    [RoutePath.TASK_BASE] : [] ,
    [RoutePath.SUBMISSION_BASE] : [],
    [RoutePath.REVIEW_BASE] :  [],


    [RoutePath.USER_PROFILE_BASE] : [],
    [RoutePath.HOME] : [],
    [''] : []
}

