import { UserRole } from "./services/auth/auth.model"

type PermissionHash = {
    [key : string] : UserRole[]
}

export const PermissionKey = {
    USER_PROFILE_BASE : 'user:profile',
    
    HOME : 'home',

    TRAINEE_BASE : 'trainee:view',
    TRAINEE_ADD : 'trainee:add',
    TRAINEE_EDIT : 'trainee:edit',
    TRAINEE_DELETE : 'trainee:delete',

    MENTOR_BASE : 'mentor:view',
    MENTOR_ADD : 'mentor:add',
    MENTOR_EDIT : 'mentor:edit',

    TASK_BASE : 'task:view',
    TASK_ADD : 'task:add',

    SUBMISSION_BASE : 'submission:view',
    SUBMISSION_ADD : 'submission:add',

    REVIEW_BASE : 'review:view',
    REVIEW_ADD : 'review:add'
}

export const AuthorisePermission  : PermissionHash = {
    [PermissionKey.TRAINEE_BASE] : [UserRole.Mentor, UserRole.Admin] ,
    [PermissionKey.MENTOR_BASE] : [UserRole.Mentor, UserRole.Admin] ,
    [PermissionKey.TASK_BASE] : [] ,
    [PermissionKey.SUBMISSION_BASE] : [],
    [PermissionKey.REVIEW_BASE] :  [],

    [PermissionKey.TRAINEE_ADD] : [UserRole.Mentor, UserRole.Admin],


    [PermissionKey.USER_PROFILE_BASE] : [],
    [PermissionKey.HOME] : []
}



