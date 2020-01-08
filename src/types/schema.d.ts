import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type ApplicationResponse = {
   __typename?: 'ApplicationResponse',
  success: Scalars['Boolean'],
  message: Scalars['String'],
  details?: Maybe<Scalars['String']>,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  user: User,
  token: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  signup: AuthPayload,
  login: AuthPayload,
  updateMyUser: User,
  approveUserEmail: ApplicationResponse,
  forgetUserEmail: ApplicationResponse,
  changeUserPassword: ApplicationResponse,
};


export type MutationSignupArgs = {
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  data?: Maybe<UserDataInput>
};


export type MutationLoginArgs = {
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>
};


export type MutationUpdateMyUserArgs = {
  data?: Maybe<UserDataInput>
};


export type MutationApproveUserEmailArgs = {
  token?: Maybe<Scalars['String']>
};


export type MutationForgetUserEmailArgs = {
  email?: Maybe<Scalars['String']>
};


export type MutationChangeUserPasswordArgs = {
  token?: Maybe<Scalars['String']>,
  password: Scalars['String']
};

export type Privilege = {
   __typename?: 'Privilege',
  id: Scalars['ID'],
  name: Scalars['String'],
  type: PrivilegeTypes,
  payload?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type PrivilegeInput = {
  name?: Maybe<Scalars['String']>,
  type?: Maybe<PrivilegeTypes>,
};

export enum PrivilegeTypes {
  Graphql = 'GRAPHQL',
  Custom = 'CUSTOM'
}

export type Query = {
   __typename?: 'Query',
  users: Array<User>,
  user?: Maybe<User>,
  myUser?: Maybe<User>,
};


export type QueryUsersArgs = {
  where?: Maybe<UserWhereInput>,
  first?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<UserOrderByInput>
};


export type QueryUserArgs = {
  where?: Maybe<UserWhereUniqueInput>
};

export type Role = {
   __typename?: 'Role',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  type?: Maybe<RolesType>,
  description?: Maybe<Scalars['String']>,
  privileges: Array<Privilege>,
};

export type RoleInput = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<RolesType>,
  privilege?: Maybe<PrivilegeInput>,
};

export enum RolesType {
  Admin = 'ADMIN',
  User = 'USER'
}

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  emailApproved: Scalars['Boolean'],
  name: Scalars['String'],
  role: Role,
  password: Scalars['String'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
};

export type UserDataInput = {
  name?: Maybe<Scalars['String']>,
};

export enum UserOrderByInput {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC'
}

export type UserWhereInput = {
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  role?: Maybe<RoleInput>,
  privilege?: Maybe<PrivilegeInput>,
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  UserWhereInput: UserWhereInput,
  String: ResolverTypeWrapper<Scalars['String']>,
  RoleInput: RoleInput,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  RolesType: RolesType,
  PrivilegeInput: PrivilegeInput,
  PrivilegeTypes: PrivilegeTypes,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  UserOrderByInput: UserOrderByInput,
  User: ResolverTypeWrapper<User>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Role: ResolverTypeWrapper<Role>,
  Privilege: ResolverTypeWrapper<Privilege>,
  UserWhereUniqueInput: UserWhereUniqueInput,
  Mutation: ResolverTypeWrapper<{}>,
  UserDataInput: UserDataInput,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  ApplicationResponse: ResolverTypeWrapper<ApplicationResponse>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  UserWhereInput: UserWhereInput,
  String: Scalars['String'],
  RoleInput: RoleInput,
  ID: Scalars['ID'],
  RolesType: RolesType,
  PrivilegeInput: PrivilegeInput,
  PrivilegeTypes: PrivilegeTypes,
  Int: Scalars['Int'],
  UserOrderByInput: UserOrderByInput,
  User: User,
  Boolean: Scalars['Boolean'],
  Role: Role,
  Privilege: Privilege,
  UserWhereUniqueInput: UserWhereUniqueInput,
  Mutation: {},
  UserDataInput: UserDataInput,
  AuthPayload: AuthPayload,
  ApplicationResponse: ApplicationResponse,
};

export type ApplicationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ApplicationResponse'] = ResolversParentTypes['ApplicationResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  details?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signup?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, MutationSignupArgs>,
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, MutationLoginArgs>,
  updateMyUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, MutationUpdateMyUserArgs>,
  approveUserEmail?: Resolver<ResolversTypes['ApplicationResponse'], ParentType, ContextType, MutationApproveUserEmailArgs>,
  forgetUserEmail?: Resolver<ResolversTypes['ApplicationResponse'], ParentType, ContextType, MutationForgetUserEmailArgs>,
  changeUserPassword?: Resolver<ResolversTypes['ApplicationResponse'], ParentType, ContextType, RequireFields<MutationChangeUserPasswordArgs, 'password'>>,
};

export type PrivilegeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Privilege'] = ResolversParentTypes['Privilege']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['PrivilegeTypes'], ParentType, ContextType>,
  payload?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, QueryUsersArgs>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, QueryUserArgs>,
  myUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['RolesType']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  privileges?: Resolver<Array<ResolversTypes['Privilege']>, ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  emailApproved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  ApplicationResponse?: ApplicationResponseResolvers<ContextType>,
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Privilege?: PrivilegeResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Role?: RoleResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
