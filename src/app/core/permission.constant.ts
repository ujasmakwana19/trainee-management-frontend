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
    MENTOR_DELETE : 'mentor:delete',
    
    TASK_BASE : 'task:view',
    TASK_ADD : 'task:add',
    TASK_EDIT : 'task:edit',
    TASK_DELETE : 'task:delete',
    
    TASK_ASSIGNED_BASE : 'taskassigned:view',
    TASK_ASSIGNED_DETAIL : 'taskassigned:detail',
    TASK_ASSIGNED_ADD : 'taskassigned:add',
    TASK_ASSIGNED_EDIT : 'taskassigned:edit',

    SUBMISSION_BASE : 'submission:view',
    SUBMISSION_ADD : 'submission:add',

    REVIEW_BASE : 'review:view',
    REVIEW_ADD : 'review:add'
}

export const AuthorisePermission  : PermissionHash = {
    [PermissionKey.TASK_BASE] : [] ,
    [PermissionKey.SUBMISSION_BASE] : [],
    [PermissionKey.REVIEW_BASE] :  [],
    
    [PermissionKey.TRAINEE_BASE] : [UserRole.Mentor, UserRole.Admin] ,
    [PermissionKey.TRAINEE_ADD] : [ UserRole.Mentor,UserRole.Admin],
    [PermissionKey.TRAINEE_EDIT] : [UserRole.Admin],
    [PermissionKey.TRAINEE_DELETE] : [UserRole.Admin],
    
    [PermissionKey.MENTOR_BASE] : [UserRole.Mentor, UserRole.Admin] ,
    [PermissionKey.MENTOR_ADD] : [UserRole.Admin],
    [PermissionKey.MENTOR_EDIT] : [UserRole.Admin],
    [PermissionKey.MENTOR_DELETE] : [UserRole.Admin],

    [PermissionKey.TASK_BASE] : [UserRole.Mentor, UserRole.Admin] ,
    [PermissionKey.TASK_ADD] : [UserRole.Mentor, UserRole.Admin],
    [PermissionKey.TASK_EDIT] : [UserRole.Mentor, UserRole.Admin],
    [PermissionKey.TASK_DELETE] : [UserRole.Mentor, UserRole.Admin],

    [PermissionKey.TASK_ASSIGNED_BASE] : [] ,
    [PermissionKey.TASK_ASSIGNED_DETAIL] : [],
    [PermissionKey.TASK_ASSIGNED_ADD] : [UserRole.Mentor, UserRole.Admin],
    [PermissionKey.TASK_ASSIGNED_EDIT] : [UserRole.Mentor, UserRole.Admin],


    [PermissionKey.USER_PROFILE_BASE] : [],
    [PermissionKey.HOME] : []
}



