
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Agent
 * 
 */
export type Agent = $Result.DefaultSelection<Prisma.$AgentPayload>
/**
 * Model ChannelBinding
 * 
 */
export type ChannelBinding = $Result.DefaultSelection<Prisma.$ChannelBindingPayload>
/**
 * Model SessionMessage
 * 
 */
export type SessionMessage = $Result.DefaultSelection<Prisma.$SessionMessagePayload>
/**
 * Model AgentVerification
 * 
 */
export type AgentVerification = $Result.DefaultSelection<Prisma.$AgentVerificationPayload>
/**
 * Model QRCode
 * 
 */
export type QRCode = $Result.DefaultSelection<Prisma.$QRCodePayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>
/**
 * Model AgentTask
 * 
 */
export type AgentTask = $Result.DefaultSelection<Prisma.$AgentTaskPayload>
/**
 * Model EnsSubdomain
 * 
 */
export type EnsSubdomain = $Result.DefaultSelection<Prisma.$EnsSubdomainPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agent`: Exposes CRUD operations for the **Agent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents
    * const agents = await prisma.agent.findMany()
    * ```
    */
  get agent(): Prisma.AgentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.channelBinding`: Exposes CRUD operations for the **ChannelBinding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChannelBindings
    * const channelBindings = await prisma.channelBinding.findMany()
    * ```
    */
  get channelBinding(): Prisma.ChannelBindingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sessionMessage`: Exposes CRUD operations for the **SessionMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SessionMessages
    * const sessionMessages = await prisma.sessionMessage.findMany()
    * ```
    */
  get sessionMessage(): Prisma.SessionMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agentVerification`: Exposes CRUD operations for the **AgentVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentVerifications
    * const agentVerifications = await prisma.agentVerification.findMany()
    * ```
    */
  get agentVerification(): Prisma.AgentVerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.qRCode`: Exposes CRUD operations for the **QRCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QRCodes
    * const qRCodes = await prisma.qRCode.findMany()
    * ```
    */
  get qRCode(): Prisma.QRCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agentTask`: Exposes CRUD operations for the **AgentTask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentTasks
    * const agentTasks = await prisma.agentTask.findMany()
    * ```
    */
  get agentTask(): Prisma.AgentTaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ensSubdomain`: Exposes CRUD operations for the **EnsSubdomain** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EnsSubdomains
    * const ensSubdomains = await prisma.ensSubdomain.findMany()
    * ```
    */
  get ensSubdomain(): Prisma.EnsSubdomainDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Agent: 'Agent',
    ChannelBinding: 'ChannelBinding',
    SessionMessage: 'SessionMessage',
    AgentVerification: 'AgentVerification',
    QRCode: 'QRCode',
    Transaction: 'Transaction',
    ActivityLog: 'ActivityLog',
    AgentTask: 'AgentTask',
    EnsSubdomain: 'EnsSubdomain'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "agent" | "channelBinding" | "sessionMessage" | "agentVerification" | "qRCode" | "transaction" | "activityLog" | "agentTask" | "ensSubdomain"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Agent: {
        payload: Prisma.$AgentPayload<ExtArgs>
        fields: Prisma.AgentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findFirst: {
            args: Prisma.AgentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findMany: {
            args: Prisma.AgentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          create: {
            args: Prisma.AgentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          createMany: {
            args: Prisma.AgentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          delete: {
            args: Prisma.AgentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          update: {
            args: Prisma.AgentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          deleteMany: {
            args: Prisma.AgentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          upsert: {
            args: Prisma.AgentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          aggregate: {
            args: Prisma.AgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent>
          }
          groupBy: {
            args: Prisma.AgentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentCountArgs<ExtArgs>
            result: $Utils.Optional<AgentCountAggregateOutputType> | number
          }
        }
      }
      ChannelBinding: {
        payload: Prisma.$ChannelBindingPayload<ExtArgs>
        fields: Prisma.ChannelBindingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChannelBindingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelBindingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChannelBindingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelBindingPayload>
          }
          findFirst: {
            args: Prisma.ChannelBindingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelBindingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChannelBindingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelBindingPayload>
          }
          findMany: {
            args: Prisma.ChannelBindingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelBindingPayload>[]
          }
          create: {
            args: Prisma.ChannelBindingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelBindingPayload>
          }
          createMany: {
            args: Prisma.ChannelBindingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChannelBindingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelBindingPayload>[]
          }
          delete: {
            args: Prisma.ChannelBindingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelBindingPayload>
          }
          update: {
            args: Prisma.ChannelBindingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelBindingPayload>
          }
          deleteMany: {
            args: Prisma.ChannelBindingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChannelBindingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChannelBindingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelBindingPayload>[]
          }
          upsert: {
            args: Prisma.ChannelBindingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelBindingPayload>
          }
          aggregate: {
            args: Prisma.ChannelBindingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChannelBinding>
          }
          groupBy: {
            args: Prisma.ChannelBindingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChannelBindingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChannelBindingCountArgs<ExtArgs>
            result: $Utils.Optional<ChannelBindingCountAggregateOutputType> | number
          }
        }
      }
      SessionMessage: {
        payload: Prisma.$SessionMessagePayload<ExtArgs>
        fields: Prisma.SessionMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionMessagePayload>
          }
          findFirst: {
            args: Prisma.SessionMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionMessagePayload>
          }
          findMany: {
            args: Prisma.SessionMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionMessagePayload>[]
          }
          create: {
            args: Prisma.SessionMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionMessagePayload>
          }
          createMany: {
            args: Prisma.SessionMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionMessagePayload>[]
          }
          delete: {
            args: Prisma.SessionMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionMessagePayload>
          }
          update: {
            args: Prisma.SessionMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionMessagePayload>
          }
          deleteMany: {
            args: Prisma.SessionMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionMessagePayload>[]
          }
          upsert: {
            args: Prisma.SessionMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionMessagePayload>
          }
          aggregate: {
            args: Prisma.SessionMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSessionMessage>
          }
          groupBy: {
            args: Prisma.SessionMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionMessageCountArgs<ExtArgs>
            result: $Utils.Optional<SessionMessageCountAggregateOutputType> | number
          }
        }
      }
      AgentVerification: {
        payload: Prisma.$AgentVerificationPayload<ExtArgs>
        fields: Prisma.AgentVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVerificationPayload>
          }
          findFirst: {
            args: Prisma.AgentVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVerificationPayload>
          }
          findMany: {
            args: Prisma.AgentVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVerificationPayload>[]
          }
          create: {
            args: Prisma.AgentVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVerificationPayload>
          }
          createMany: {
            args: Prisma.AgentVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVerificationPayload>[]
          }
          delete: {
            args: Prisma.AgentVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVerificationPayload>
          }
          update: {
            args: Prisma.AgentVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVerificationPayload>
          }
          deleteMany: {
            args: Prisma.AgentVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentVerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVerificationPayload>[]
          }
          upsert: {
            args: Prisma.AgentVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVerificationPayload>
          }
          aggregate: {
            args: Prisma.AgentVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentVerification>
          }
          groupBy: {
            args: Prisma.AgentVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<AgentVerificationCountAggregateOutputType> | number
          }
        }
      }
      QRCode: {
        payload: Prisma.$QRCodePayload<ExtArgs>
        fields: Prisma.QRCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QRCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QRCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>
          }
          findFirst: {
            args: Prisma.QRCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QRCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>
          }
          findMany: {
            args: Prisma.QRCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>[]
          }
          create: {
            args: Prisma.QRCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>
          }
          createMany: {
            args: Prisma.QRCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QRCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>[]
          }
          delete: {
            args: Prisma.QRCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>
          }
          update: {
            args: Prisma.QRCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>
          }
          deleteMany: {
            args: Prisma.QRCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QRCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QRCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>[]
          }
          upsert: {
            args: Prisma.QRCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>
          }
          aggregate: {
            args: Prisma.QRCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQRCode>
          }
          groupBy: {
            args: Prisma.QRCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<QRCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.QRCodeCountArgs<ExtArgs>
            result: $Utils.Optional<QRCodeCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
      AgentTask: {
        payload: Prisma.$AgentTaskPayload<ExtArgs>
        fields: Prisma.AgentTaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentTaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentTaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentTaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentTaskPayload>
          }
          findFirst: {
            args: Prisma.AgentTaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentTaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentTaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentTaskPayload>
          }
          findMany: {
            args: Prisma.AgentTaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentTaskPayload>[]
          }
          create: {
            args: Prisma.AgentTaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentTaskPayload>
          }
          createMany: {
            args: Prisma.AgentTaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentTaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentTaskPayload>[]
          }
          delete: {
            args: Prisma.AgentTaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentTaskPayload>
          }
          update: {
            args: Prisma.AgentTaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentTaskPayload>
          }
          deleteMany: {
            args: Prisma.AgentTaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentTaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentTaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentTaskPayload>[]
          }
          upsert: {
            args: Prisma.AgentTaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentTaskPayload>
          }
          aggregate: {
            args: Prisma.AgentTaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentTask>
          }
          groupBy: {
            args: Prisma.AgentTaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentTaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentTaskCountArgs<ExtArgs>
            result: $Utils.Optional<AgentTaskCountAggregateOutputType> | number
          }
        }
      }
      EnsSubdomain: {
        payload: Prisma.$EnsSubdomainPayload<ExtArgs>
        fields: Prisma.EnsSubdomainFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnsSubdomainFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnsSubdomainPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnsSubdomainFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnsSubdomainPayload>
          }
          findFirst: {
            args: Prisma.EnsSubdomainFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnsSubdomainPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnsSubdomainFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnsSubdomainPayload>
          }
          findMany: {
            args: Prisma.EnsSubdomainFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnsSubdomainPayload>[]
          }
          create: {
            args: Prisma.EnsSubdomainCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnsSubdomainPayload>
          }
          createMany: {
            args: Prisma.EnsSubdomainCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnsSubdomainCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnsSubdomainPayload>[]
          }
          delete: {
            args: Prisma.EnsSubdomainDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnsSubdomainPayload>
          }
          update: {
            args: Prisma.EnsSubdomainUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnsSubdomainPayload>
          }
          deleteMany: {
            args: Prisma.EnsSubdomainDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnsSubdomainUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EnsSubdomainUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnsSubdomainPayload>[]
          }
          upsert: {
            args: Prisma.EnsSubdomainUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnsSubdomainPayload>
          }
          aggregate: {
            args: Prisma.EnsSubdomainAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnsSubdomain>
          }
          groupBy: {
            args: Prisma.EnsSubdomainGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnsSubdomainGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnsSubdomainCountArgs<ExtArgs>
            result: $Utils.Optional<EnsSubdomainCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    agent?: AgentOmit
    channelBinding?: ChannelBindingOmit
    sessionMessage?: SessionMessageOmit
    agentVerification?: AgentVerificationOmit
    qRCode?: QRCodeOmit
    transaction?: TransactionOmit
    activityLog?: ActivityLogOmit
    agentTask?: AgentTaskOmit
    ensSubdomain?: EnsSubdomainOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    agents: number
    agentTasks: number
    channelBindings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | UserCountOutputTypeCountAgentsArgs
    agentTasks?: boolean | UserCountOutputTypeCountAgentTasksArgs
    channelBindings?: boolean | UserCountOutputTypeCountChannelBindingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAgentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAgentTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentTaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChannelBindingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelBindingWhereInput
  }


  /**
   * Count Type AgentCountOutputType
   */

  export type AgentCountOutputType = {
    transactions: number
    activityLogs: number
    channelBindings: number
    agentTasks: number
  }

  export type AgentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | AgentCountOutputTypeCountTransactionsArgs
    activityLogs?: boolean | AgentCountOutputTypeCountActivityLogsArgs
    channelBindings?: boolean | AgentCountOutputTypeCountChannelBindingsArgs
    agentTasks?: boolean | AgentCountOutputTypeCountAgentTasksArgs
  }

  // Custom InputTypes
  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCountOutputType
     */
    select?: AgentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountActivityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountChannelBindingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelBindingWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountAgentTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentTaskWhereInput
  }


  /**
   * Count Type ChannelBindingCountOutputType
   */

  export type ChannelBindingCountOutputType = {
    sessionMessages: number
  }

  export type ChannelBindingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessionMessages?: boolean | ChannelBindingCountOutputTypeCountSessionMessagesArgs
  }

  // Custom InputTypes
  /**
   * ChannelBindingCountOutputType without action
   */
  export type ChannelBindingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBindingCountOutputType
     */
    select?: ChannelBindingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChannelBindingCountOutputType without action
   */
  export type ChannelBindingCountOutputTypeCountSessionMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    walletDerivationIndex: number | null
  }

  export type UserSumAggregateOutputType = {
    walletDerivationIndex: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    walletAddress: string | null
    walletDerivationIndex: number | null
    openrouterApiKey: string | null
    openaiApiKey: string | null
    groqApiKey: string | null
    grokApiKey: string | null
    geminiApiKey: string | null
    deepseekApiKey: string | null
    zaiApiKey: string | null
    anthropicApiKey: string | null
    telegramId: string | null
    telegramUsername: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    walletAddress: string | null
    walletDerivationIndex: number | null
    openrouterApiKey: string | null
    openaiApiKey: string | null
    groqApiKey: string | null
    grokApiKey: string | null
    geminiApiKey: string | null
    deepseekApiKey: string | null
    zaiApiKey: string | null
    anthropicApiKey: string | null
    telegramId: string | null
    telegramUsername: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    walletAddress: number
    walletDerivationIndex: number
    openrouterApiKey: number
    openaiApiKey: number
    groqApiKey: number
    grokApiKey: number
    geminiApiKey: number
    deepseekApiKey: number
    zaiApiKey: number
    anthropicApiKey: number
    telegramId: number
    telegramUsername: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    walletDerivationIndex?: true
  }

  export type UserSumAggregateInputType = {
    walletDerivationIndex?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    walletAddress?: true
    walletDerivationIndex?: true
    openrouterApiKey?: true
    openaiApiKey?: true
    groqApiKey?: true
    grokApiKey?: true
    geminiApiKey?: true
    deepseekApiKey?: true
    zaiApiKey?: true
    anthropicApiKey?: true
    telegramId?: true
    telegramUsername?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    walletAddress?: true
    walletDerivationIndex?: true
    openrouterApiKey?: true
    openaiApiKey?: true
    groqApiKey?: true
    grokApiKey?: true
    geminiApiKey?: true
    deepseekApiKey?: true
    zaiApiKey?: true
    anthropicApiKey?: true
    telegramId?: true
    telegramUsername?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    walletAddress?: true
    walletDerivationIndex?: true
    openrouterApiKey?: true
    openaiApiKey?: true
    groqApiKey?: true
    grokApiKey?: true
    geminiApiKey?: true
    deepseekApiKey?: true
    zaiApiKey?: true
    anthropicApiKey?: true
    telegramId?: true
    telegramUsername?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string | null
    walletAddress: string
    walletDerivationIndex: number | null
    openrouterApiKey: string | null
    openaiApiKey: string | null
    groqApiKey: string | null
    grokApiKey: string | null
    geminiApiKey: string | null
    deepseekApiKey: string | null
    zaiApiKey: string | null
    anthropicApiKey: string | null
    telegramId: string | null
    telegramUsername: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    walletAddress?: boolean
    walletDerivationIndex?: boolean
    openrouterApiKey?: boolean
    openaiApiKey?: boolean
    groqApiKey?: boolean
    grokApiKey?: boolean
    geminiApiKey?: boolean
    deepseekApiKey?: boolean
    zaiApiKey?: boolean
    anthropicApiKey?: boolean
    telegramId?: boolean
    telegramUsername?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agents?: boolean | User$agentsArgs<ExtArgs>
    agentTasks?: boolean | User$agentTasksArgs<ExtArgs>
    channelBindings?: boolean | User$channelBindingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    walletAddress?: boolean
    walletDerivationIndex?: boolean
    openrouterApiKey?: boolean
    openaiApiKey?: boolean
    groqApiKey?: boolean
    grokApiKey?: boolean
    geminiApiKey?: boolean
    deepseekApiKey?: boolean
    zaiApiKey?: boolean
    anthropicApiKey?: boolean
    telegramId?: boolean
    telegramUsername?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    walletAddress?: boolean
    walletDerivationIndex?: boolean
    openrouterApiKey?: boolean
    openaiApiKey?: boolean
    groqApiKey?: boolean
    grokApiKey?: boolean
    geminiApiKey?: boolean
    deepseekApiKey?: boolean
    zaiApiKey?: boolean
    anthropicApiKey?: boolean
    telegramId?: boolean
    telegramUsername?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    walletAddress?: boolean
    walletDerivationIndex?: boolean
    openrouterApiKey?: boolean
    openaiApiKey?: boolean
    groqApiKey?: boolean
    grokApiKey?: boolean
    geminiApiKey?: boolean
    deepseekApiKey?: boolean
    zaiApiKey?: boolean
    anthropicApiKey?: boolean
    telegramId?: boolean
    telegramUsername?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "walletAddress" | "walletDerivationIndex" | "openrouterApiKey" | "openaiApiKey" | "groqApiKey" | "grokApiKey" | "geminiApiKey" | "deepseekApiKey" | "zaiApiKey" | "anthropicApiKey" | "telegramId" | "telegramUsername" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | User$agentsArgs<ExtArgs>
    agentTasks?: boolean | User$agentTasksArgs<ExtArgs>
    channelBindings?: boolean | User$channelBindingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      agents: Prisma.$AgentPayload<ExtArgs>[]
      agentTasks: Prisma.$AgentTaskPayload<ExtArgs>[]
      channelBindings: Prisma.$ChannelBindingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      walletAddress: string
      walletDerivationIndex: number | null
      openrouterApiKey: string | null
      openaiApiKey: string | null
      groqApiKey: string | null
      grokApiKey: string | null
      geminiApiKey: string | null
      deepseekApiKey: string | null
      zaiApiKey: string | null
      anthropicApiKey: string | null
      telegramId: string | null
      telegramUsername: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agents<T extends User$agentsArgs<ExtArgs> = {}>(args?: Subset<T, User$agentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    agentTasks<T extends User$agentTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$agentTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    channelBindings<T extends User$channelBindingsArgs<ExtArgs> = {}>(args?: Subset<T, User$channelBindingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly walletDerivationIndex: FieldRef<"User", 'Int'>
    readonly openrouterApiKey: FieldRef<"User", 'String'>
    readonly openaiApiKey: FieldRef<"User", 'String'>
    readonly groqApiKey: FieldRef<"User", 'String'>
    readonly grokApiKey: FieldRef<"User", 'String'>
    readonly geminiApiKey: FieldRef<"User", 'String'>
    readonly deepseekApiKey: FieldRef<"User", 'String'>
    readonly zaiApiKey: FieldRef<"User", 'String'>
    readonly anthropicApiKey: FieldRef<"User", 'String'>
    readonly telegramId: FieldRef<"User", 'String'>
    readonly telegramUsername: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.agents
   */
  export type User$agentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    cursor?: AgentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * User.agentTasks
   */
  export type User$agentTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskInclude<ExtArgs> | null
    where?: AgentTaskWhereInput
    orderBy?: AgentTaskOrderByWithRelationInput | AgentTaskOrderByWithRelationInput[]
    cursor?: AgentTaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentTaskScalarFieldEnum | AgentTaskScalarFieldEnum[]
  }

  /**
   * User.channelBindings
   */
  export type User$channelBindingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingInclude<ExtArgs> | null
    where?: ChannelBindingWhereInput
    orderBy?: ChannelBindingOrderByWithRelationInput | ChannelBindingOrderByWithRelationInput[]
    cursor?: ChannelBindingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChannelBindingScalarFieldEnum | ChannelBindingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Agent
   */

  export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  export type AgentAvgAggregateOutputType = {
    spendingLimit: number | null
    spendingUsed: number | null
    walletDerivationIndex: number | null
    erc8004ChainId: number | null
    reputationScore: number | null
  }

  export type AgentSumAggregateOutputType = {
    spendingLimit: number | null
    spendingUsed: number | null
    walletDerivationIndex: number | null
    erc8004ChainId: number | null
    reputationScore: number | null
  }

  export type AgentMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    templateType: string | null
    status: string | null
    systemPrompt: string | null
    llmProvider: string | null
    llmModel: string | null
    spendingLimit: number | null
    spendingUsed: number | null
    agentWalletAddress: string | null
    walletDerivationIndex: number | null
    walletType: string | null
    sessionKeyAddress: string | null
    sessionKeyPrivateKey: string | null
    sessionContext: string | null
    sessionExpiresAt: Date | null
    sessionPermissions: string | null
    telegramBotToken: string | null
    telegramChatIds: string | null
    discordBotToken: string | null
    webhookSecret: string | null
    disabledSkills: string | null
    externalSocials: string | null
    channels: string | null
    cronJobs: string | null
    pairingCode: string | null
    pairingCodeExpiresAt: Date | null
    openclawAgentId: string | null
    imageUrl: string | null
    imageSlug: string | null
    imageDataBase64: string | null
    erc8004AgentId: string | null
    erc8004URI: string | null
    erc8004TxHash: string | null
    erc8004ChainId: number | null
    reputationScore: number | null
    exported: boolean | null
    exportedAt: Date | null
    configuration: string | null
    ensSubdomain: string | null
    ensNode: string | null
    ensRegisteredAt: Date | null
    agentDeployedTokens: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deployedAt: Date | null
  }

  export type AgentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    templateType: string | null
    status: string | null
    systemPrompt: string | null
    llmProvider: string | null
    llmModel: string | null
    spendingLimit: number | null
    spendingUsed: number | null
    agentWalletAddress: string | null
    walletDerivationIndex: number | null
    walletType: string | null
    sessionKeyAddress: string | null
    sessionKeyPrivateKey: string | null
    sessionContext: string | null
    sessionExpiresAt: Date | null
    sessionPermissions: string | null
    telegramBotToken: string | null
    telegramChatIds: string | null
    discordBotToken: string | null
    webhookSecret: string | null
    disabledSkills: string | null
    externalSocials: string | null
    channels: string | null
    cronJobs: string | null
    pairingCode: string | null
    pairingCodeExpiresAt: Date | null
    openclawAgentId: string | null
    imageUrl: string | null
    imageSlug: string | null
    imageDataBase64: string | null
    erc8004AgentId: string | null
    erc8004URI: string | null
    erc8004TxHash: string | null
    erc8004ChainId: number | null
    reputationScore: number | null
    exported: boolean | null
    exportedAt: Date | null
    configuration: string | null
    ensSubdomain: string | null
    ensNode: string | null
    ensRegisteredAt: Date | null
    agentDeployedTokens: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deployedAt: Date | null
  }

  export type AgentCountAggregateOutputType = {
    id: number
    name: number
    description: number
    templateType: number
    status: number
    systemPrompt: number
    llmProvider: number
    llmModel: number
    spendingLimit: number
    spendingUsed: number
    agentWalletAddress: number
    walletDerivationIndex: number
    walletType: number
    sessionKeyAddress: number
    sessionKeyPrivateKey: number
    sessionContext: number
    sessionExpiresAt: number
    sessionPermissions: number
    telegramBotToken: number
    telegramChatIds: number
    discordBotToken: number
    webhookSecret: number
    disabledSkills: number
    externalSocials: number
    channels: number
    cronJobs: number
    pairingCode: number
    pairingCodeExpiresAt: number
    openclawAgentId: number
    imageUrl: number
    imageSlug: number
    imageDataBase64: number
    erc8004AgentId: number
    erc8004URI: number
    erc8004TxHash: number
    erc8004ChainId: number
    reputationScore: number
    exported: number
    exportedAt: number
    configuration: number
    ensSubdomain: number
    ensNode: number
    ensRegisteredAt: number
    agentDeployedTokens: number
    ownerId: number
    createdAt: number
    updatedAt: number
    deployedAt: number
    _all: number
  }


  export type AgentAvgAggregateInputType = {
    spendingLimit?: true
    spendingUsed?: true
    walletDerivationIndex?: true
    erc8004ChainId?: true
    reputationScore?: true
  }

  export type AgentSumAggregateInputType = {
    spendingLimit?: true
    spendingUsed?: true
    walletDerivationIndex?: true
    erc8004ChainId?: true
    reputationScore?: true
  }

  export type AgentMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    templateType?: true
    status?: true
    systemPrompt?: true
    llmProvider?: true
    llmModel?: true
    spendingLimit?: true
    spendingUsed?: true
    agentWalletAddress?: true
    walletDerivationIndex?: true
    walletType?: true
    sessionKeyAddress?: true
    sessionKeyPrivateKey?: true
    sessionContext?: true
    sessionExpiresAt?: true
    sessionPermissions?: true
    telegramBotToken?: true
    telegramChatIds?: true
    discordBotToken?: true
    webhookSecret?: true
    disabledSkills?: true
    externalSocials?: true
    channels?: true
    cronJobs?: true
    pairingCode?: true
    pairingCodeExpiresAt?: true
    openclawAgentId?: true
    imageUrl?: true
    imageSlug?: true
    imageDataBase64?: true
    erc8004AgentId?: true
    erc8004URI?: true
    erc8004TxHash?: true
    erc8004ChainId?: true
    reputationScore?: true
    exported?: true
    exportedAt?: true
    configuration?: true
    ensSubdomain?: true
    ensNode?: true
    ensRegisteredAt?: true
    agentDeployedTokens?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    deployedAt?: true
  }

  export type AgentMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    templateType?: true
    status?: true
    systemPrompt?: true
    llmProvider?: true
    llmModel?: true
    spendingLimit?: true
    spendingUsed?: true
    agentWalletAddress?: true
    walletDerivationIndex?: true
    walletType?: true
    sessionKeyAddress?: true
    sessionKeyPrivateKey?: true
    sessionContext?: true
    sessionExpiresAt?: true
    sessionPermissions?: true
    telegramBotToken?: true
    telegramChatIds?: true
    discordBotToken?: true
    webhookSecret?: true
    disabledSkills?: true
    externalSocials?: true
    channels?: true
    cronJobs?: true
    pairingCode?: true
    pairingCodeExpiresAt?: true
    openclawAgentId?: true
    imageUrl?: true
    imageSlug?: true
    imageDataBase64?: true
    erc8004AgentId?: true
    erc8004URI?: true
    erc8004TxHash?: true
    erc8004ChainId?: true
    reputationScore?: true
    exported?: true
    exportedAt?: true
    configuration?: true
    ensSubdomain?: true
    ensNode?: true
    ensRegisteredAt?: true
    agentDeployedTokens?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    deployedAt?: true
  }

  export type AgentCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    templateType?: true
    status?: true
    systemPrompt?: true
    llmProvider?: true
    llmModel?: true
    spendingLimit?: true
    spendingUsed?: true
    agentWalletAddress?: true
    walletDerivationIndex?: true
    walletType?: true
    sessionKeyAddress?: true
    sessionKeyPrivateKey?: true
    sessionContext?: true
    sessionExpiresAt?: true
    sessionPermissions?: true
    telegramBotToken?: true
    telegramChatIds?: true
    discordBotToken?: true
    webhookSecret?: true
    disabledSkills?: true
    externalSocials?: true
    channels?: true
    cronJobs?: true
    pairingCode?: true
    pairingCodeExpiresAt?: true
    openclawAgentId?: true
    imageUrl?: true
    imageSlug?: true
    imageDataBase64?: true
    erc8004AgentId?: true
    erc8004URI?: true
    erc8004TxHash?: true
    erc8004ChainId?: true
    reputationScore?: true
    exported?: true
    exportedAt?: true
    configuration?: true
    ensSubdomain?: true
    ensNode?: true
    ensRegisteredAt?: true
    agentDeployedTokens?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    deployedAt?: true
    _all?: true
  }

  export type AgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agent to aggregate.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agents
    **/
    _count?: true | AgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMaxAggregateInputType
  }

  export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent[P]>
      : GetScalarType<T[P], AggregateAgent[P]>
  }




  export type AgentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithAggregationInput | AgentOrderByWithAggregationInput[]
    by: AgentScalarFieldEnum[] | AgentScalarFieldEnum
    having?: AgentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentCountAggregateInputType | true
    _avg?: AgentAvgAggregateInputType
    _sum?: AgentSumAggregateInputType
    _min?: AgentMinAggregateInputType
    _max?: AgentMaxAggregateInputType
  }

  export type AgentGroupByOutputType = {
    id: string
    name: string
    description: string | null
    templateType: string
    status: string
    systemPrompt: string | null
    llmProvider: string
    llmModel: string
    spendingLimit: number
    spendingUsed: number
    agentWalletAddress: string | null
    walletDerivationIndex: number | null
    walletType: string | null
    sessionKeyAddress: string | null
    sessionKeyPrivateKey: string | null
    sessionContext: string | null
    sessionExpiresAt: Date | null
    sessionPermissions: string | null
    telegramBotToken: string | null
    telegramChatIds: string | null
    discordBotToken: string | null
    webhookSecret: string | null
    disabledSkills: string | null
    externalSocials: string | null
    channels: string | null
    cronJobs: string | null
    pairingCode: string | null
    pairingCodeExpiresAt: Date | null
    openclawAgentId: string | null
    imageUrl: string | null
    imageSlug: string | null
    imageDataBase64: string | null
    erc8004AgentId: string | null
    erc8004URI: string | null
    erc8004TxHash: string | null
    erc8004ChainId: number | null
    reputationScore: number
    exported: boolean
    exportedAt: Date | null
    configuration: string | null
    ensSubdomain: string | null
    ensNode: string | null
    ensRegisteredAt: Date | null
    agentDeployedTokens: string | null
    ownerId: string
    createdAt: Date
    updatedAt: Date
    deployedAt: Date | null
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  type GetAgentGroupByPayload<T extends AgentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentGroupByOutputType[P]>
            : GetScalarType<T[P], AgentGroupByOutputType[P]>
        }
      >
    >


  export type AgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    templateType?: boolean
    status?: boolean
    systemPrompt?: boolean
    llmProvider?: boolean
    llmModel?: boolean
    spendingLimit?: boolean
    spendingUsed?: boolean
    agentWalletAddress?: boolean
    walletDerivationIndex?: boolean
    walletType?: boolean
    sessionKeyAddress?: boolean
    sessionKeyPrivateKey?: boolean
    sessionContext?: boolean
    sessionExpiresAt?: boolean
    sessionPermissions?: boolean
    telegramBotToken?: boolean
    telegramChatIds?: boolean
    discordBotToken?: boolean
    webhookSecret?: boolean
    disabledSkills?: boolean
    externalSocials?: boolean
    channels?: boolean
    cronJobs?: boolean
    pairingCode?: boolean
    pairingCodeExpiresAt?: boolean
    openclawAgentId?: boolean
    imageUrl?: boolean
    imageSlug?: boolean
    imageDataBase64?: boolean
    erc8004AgentId?: boolean
    erc8004URI?: boolean
    erc8004TxHash?: boolean
    erc8004ChainId?: boolean
    reputationScore?: boolean
    exported?: boolean
    exportedAt?: boolean
    configuration?: boolean
    ensSubdomain?: boolean
    ensNode?: boolean
    ensRegisteredAt?: boolean
    agentDeployedTokens?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deployedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Agent$transactionsArgs<ExtArgs>
    activityLogs?: boolean | Agent$activityLogsArgs<ExtArgs>
    channelBindings?: boolean | Agent$channelBindingsArgs<ExtArgs>
    verification?: boolean | Agent$verificationArgs<ExtArgs>
    agentTasks?: boolean | Agent$agentTasksArgs<ExtArgs>
    ensRegistration?: boolean | Agent$ensRegistrationArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    templateType?: boolean
    status?: boolean
    systemPrompt?: boolean
    llmProvider?: boolean
    llmModel?: boolean
    spendingLimit?: boolean
    spendingUsed?: boolean
    agentWalletAddress?: boolean
    walletDerivationIndex?: boolean
    walletType?: boolean
    sessionKeyAddress?: boolean
    sessionKeyPrivateKey?: boolean
    sessionContext?: boolean
    sessionExpiresAt?: boolean
    sessionPermissions?: boolean
    telegramBotToken?: boolean
    telegramChatIds?: boolean
    discordBotToken?: boolean
    webhookSecret?: boolean
    disabledSkills?: boolean
    externalSocials?: boolean
    channels?: boolean
    cronJobs?: boolean
    pairingCode?: boolean
    pairingCodeExpiresAt?: boolean
    openclawAgentId?: boolean
    imageUrl?: boolean
    imageSlug?: boolean
    imageDataBase64?: boolean
    erc8004AgentId?: boolean
    erc8004URI?: boolean
    erc8004TxHash?: boolean
    erc8004ChainId?: boolean
    reputationScore?: boolean
    exported?: boolean
    exportedAt?: boolean
    configuration?: boolean
    ensSubdomain?: boolean
    ensNode?: boolean
    ensRegisteredAt?: boolean
    agentDeployedTokens?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deployedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    templateType?: boolean
    status?: boolean
    systemPrompt?: boolean
    llmProvider?: boolean
    llmModel?: boolean
    spendingLimit?: boolean
    spendingUsed?: boolean
    agentWalletAddress?: boolean
    walletDerivationIndex?: boolean
    walletType?: boolean
    sessionKeyAddress?: boolean
    sessionKeyPrivateKey?: boolean
    sessionContext?: boolean
    sessionExpiresAt?: boolean
    sessionPermissions?: boolean
    telegramBotToken?: boolean
    telegramChatIds?: boolean
    discordBotToken?: boolean
    webhookSecret?: boolean
    disabledSkills?: boolean
    externalSocials?: boolean
    channels?: boolean
    cronJobs?: boolean
    pairingCode?: boolean
    pairingCodeExpiresAt?: boolean
    openclawAgentId?: boolean
    imageUrl?: boolean
    imageSlug?: boolean
    imageDataBase64?: boolean
    erc8004AgentId?: boolean
    erc8004URI?: boolean
    erc8004TxHash?: boolean
    erc8004ChainId?: boolean
    reputationScore?: boolean
    exported?: boolean
    exportedAt?: boolean
    configuration?: boolean
    ensSubdomain?: boolean
    ensNode?: boolean
    ensRegisteredAt?: boolean
    agentDeployedTokens?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deployedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    templateType?: boolean
    status?: boolean
    systemPrompt?: boolean
    llmProvider?: boolean
    llmModel?: boolean
    spendingLimit?: boolean
    spendingUsed?: boolean
    agentWalletAddress?: boolean
    walletDerivationIndex?: boolean
    walletType?: boolean
    sessionKeyAddress?: boolean
    sessionKeyPrivateKey?: boolean
    sessionContext?: boolean
    sessionExpiresAt?: boolean
    sessionPermissions?: boolean
    telegramBotToken?: boolean
    telegramChatIds?: boolean
    discordBotToken?: boolean
    webhookSecret?: boolean
    disabledSkills?: boolean
    externalSocials?: boolean
    channels?: boolean
    cronJobs?: boolean
    pairingCode?: boolean
    pairingCodeExpiresAt?: boolean
    openclawAgentId?: boolean
    imageUrl?: boolean
    imageSlug?: boolean
    imageDataBase64?: boolean
    erc8004AgentId?: boolean
    erc8004URI?: boolean
    erc8004TxHash?: boolean
    erc8004ChainId?: boolean
    reputationScore?: boolean
    exported?: boolean
    exportedAt?: boolean
    configuration?: boolean
    ensSubdomain?: boolean
    ensNode?: boolean
    ensRegisteredAt?: boolean
    agentDeployedTokens?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deployedAt?: boolean
  }

  export type AgentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "templateType" | "status" | "systemPrompt" | "llmProvider" | "llmModel" | "spendingLimit" | "spendingUsed" | "agentWalletAddress" | "walletDerivationIndex" | "walletType" | "sessionKeyAddress" | "sessionKeyPrivateKey" | "sessionContext" | "sessionExpiresAt" | "sessionPermissions" | "telegramBotToken" | "telegramChatIds" | "discordBotToken" | "webhookSecret" | "disabledSkills" | "externalSocials" | "channels" | "cronJobs" | "pairingCode" | "pairingCodeExpiresAt" | "openclawAgentId" | "imageUrl" | "imageSlug" | "imageDataBase64" | "erc8004AgentId" | "erc8004URI" | "erc8004TxHash" | "erc8004ChainId" | "reputationScore" | "exported" | "exportedAt" | "configuration" | "ensSubdomain" | "ensNode" | "ensRegisteredAt" | "agentDeployedTokens" | "ownerId" | "createdAt" | "updatedAt" | "deployedAt", ExtArgs["result"]["agent"]>
  export type AgentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Agent$transactionsArgs<ExtArgs>
    activityLogs?: boolean | Agent$activityLogsArgs<ExtArgs>
    channelBindings?: boolean | Agent$channelBindingsArgs<ExtArgs>
    verification?: boolean | Agent$verificationArgs<ExtArgs>
    agentTasks?: boolean | Agent$agentTasksArgs<ExtArgs>
    ensRegistration?: boolean | Agent$ensRegistrationArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AgentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AgentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agent"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      activityLogs: Prisma.$ActivityLogPayload<ExtArgs>[]
      channelBindings: Prisma.$ChannelBindingPayload<ExtArgs>[]
      verification: Prisma.$AgentVerificationPayload<ExtArgs> | null
      agentTasks: Prisma.$AgentTaskPayload<ExtArgs>[]
      ensRegistration: Prisma.$EnsSubdomainPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      templateType: string
      status: string
      systemPrompt: string | null
      llmProvider: string
      llmModel: string
      spendingLimit: number
      spendingUsed: number
      agentWalletAddress: string | null
      walletDerivationIndex: number | null
      walletType: string | null
      sessionKeyAddress: string | null
      sessionKeyPrivateKey: string | null
      sessionContext: string | null
      sessionExpiresAt: Date | null
      sessionPermissions: string | null
      telegramBotToken: string | null
      telegramChatIds: string | null
      discordBotToken: string | null
      webhookSecret: string | null
      disabledSkills: string | null
      externalSocials: string | null
      channels: string | null
      cronJobs: string | null
      pairingCode: string | null
      pairingCodeExpiresAt: Date | null
      openclawAgentId: string | null
      imageUrl: string | null
      imageSlug: string | null
      imageDataBase64: string | null
      erc8004AgentId: string | null
      erc8004URI: string | null
      erc8004TxHash: string | null
      erc8004ChainId: number | null
      reputationScore: number
      exported: boolean
      exportedAt: Date | null
      configuration: string | null
      ensSubdomain: string | null
      ensNode: string | null
      ensRegisteredAt: Date | null
      agentDeployedTokens: string | null
      ownerId: string
      createdAt: Date
      updatedAt: Date
      deployedAt: Date | null
    }, ExtArgs["result"]["agent"]>
    composites: {}
  }

  type AgentGetPayload<S extends boolean | null | undefined | AgentDefaultArgs> = $Result.GetResult<Prisma.$AgentPayload, S>

  type AgentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentCountAggregateInputType | true
    }

  export interface AgentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agent'], meta: { name: 'Agent' } }
    /**
     * Find zero or one Agent that matches the filter.
     * @param {AgentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentFindUniqueArgs>(args: SelectSubset<T, AgentFindUniqueArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentFindFirstArgs>(args?: SelectSubset<T, AgentFindFirstArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     * 
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentFindManyArgs>(args?: SelectSubset<T, AgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent.
     * @param {AgentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     * 
     */
    create<T extends AgentCreateArgs>(args: SelectSubset<T, AgentCreateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agents.
     * @param {AgentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentCreateManyArgs>(args?: SelectSubset<T, AgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {AgentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent.
     * @param {AgentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     * 
     */
    delete<T extends AgentDeleteArgs>(args: SelectSubset<T, AgentDeleteArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent.
     * @param {AgentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentUpdateArgs>(args: SelectSubset<T, AgentUpdateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agents.
     * @param {AgentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentDeleteManyArgs>(args?: SelectSubset<T, AgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentUpdateManyArgs>(args: SelectSubset<T, AgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents and returns the data updated in the database.
     * @param {AgentUpdateManyAndReturnArgs} args - Arguments to update many Agents.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent.
     * @param {AgentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends AgentUpsertArgs>(args: SelectSubset<T, AgentUpsertArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends AgentCountArgs>(
      args?: Subset<T, AgentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentAggregateArgs>(args: Subset<T, AgentAggregateArgs>): Prisma.PrismaPromise<GetAgentAggregateType<T>>

    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentGroupByArgs['orderBy'] }
        : { orderBy?: AgentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agent model
   */
  readonly fields: AgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Agent$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activityLogs<T extends Agent$activityLogsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$activityLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    channelBindings<T extends Agent$channelBindingsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$channelBindingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    verification<T extends Agent$verificationArgs<ExtArgs> = {}>(args?: Subset<T, Agent$verificationArgs<ExtArgs>>): Prisma__AgentVerificationClient<$Result.GetResult<Prisma.$AgentVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    agentTasks<T extends Agent$agentTasksArgs<ExtArgs> = {}>(args?: Subset<T, Agent$agentTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ensRegistration<T extends Agent$ensRegistrationArgs<ExtArgs> = {}>(args?: Subset<T, Agent$ensRegistrationArgs<ExtArgs>>): Prisma__EnsSubdomainClient<$Result.GetResult<Prisma.$EnsSubdomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agent model
   */
  interface AgentFieldRefs {
    readonly id: FieldRef<"Agent", 'String'>
    readonly name: FieldRef<"Agent", 'String'>
    readonly description: FieldRef<"Agent", 'String'>
    readonly templateType: FieldRef<"Agent", 'String'>
    readonly status: FieldRef<"Agent", 'String'>
    readonly systemPrompt: FieldRef<"Agent", 'String'>
    readonly llmProvider: FieldRef<"Agent", 'String'>
    readonly llmModel: FieldRef<"Agent", 'String'>
    readonly spendingLimit: FieldRef<"Agent", 'Float'>
    readonly spendingUsed: FieldRef<"Agent", 'Float'>
    readonly agentWalletAddress: FieldRef<"Agent", 'String'>
    readonly walletDerivationIndex: FieldRef<"Agent", 'Int'>
    readonly walletType: FieldRef<"Agent", 'String'>
    readonly sessionKeyAddress: FieldRef<"Agent", 'String'>
    readonly sessionKeyPrivateKey: FieldRef<"Agent", 'String'>
    readonly sessionContext: FieldRef<"Agent", 'String'>
    readonly sessionExpiresAt: FieldRef<"Agent", 'DateTime'>
    readonly sessionPermissions: FieldRef<"Agent", 'String'>
    readonly telegramBotToken: FieldRef<"Agent", 'String'>
    readonly telegramChatIds: FieldRef<"Agent", 'String'>
    readonly discordBotToken: FieldRef<"Agent", 'String'>
    readonly webhookSecret: FieldRef<"Agent", 'String'>
    readonly disabledSkills: FieldRef<"Agent", 'String'>
    readonly externalSocials: FieldRef<"Agent", 'String'>
    readonly channels: FieldRef<"Agent", 'String'>
    readonly cronJobs: FieldRef<"Agent", 'String'>
    readonly pairingCode: FieldRef<"Agent", 'String'>
    readonly pairingCodeExpiresAt: FieldRef<"Agent", 'DateTime'>
    readonly openclawAgentId: FieldRef<"Agent", 'String'>
    readonly imageUrl: FieldRef<"Agent", 'String'>
    readonly imageSlug: FieldRef<"Agent", 'String'>
    readonly imageDataBase64: FieldRef<"Agent", 'String'>
    readonly erc8004AgentId: FieldRef<"Agent", 'String'>
    readonly erc8004URI: FieldRef<"Agent", 'String'>
    readonly erc8004TxHash: FieldRef<"Agent", 'String'>
    readonly erc8004ChainId: FieldRef<"Agent", 'Int'>
    readonly reputationScore: FieldRef<"Agent", 'Float'>
    readonly exported: FieldRef<"Agent", 'Boolean'>
    readonly exportedAt: FieldRef<"Agent", 'DateTime'>
    readonly configuration: FieldRef<"Agent", 'String'>
    readonly ensSubdomain: FieldRef<"Agent", 'String'>
    readonly ensNode: FieldRef<"Agent", 'String'>
    readonly ensRegisteredAt: FieldRef<"Agent", 'DateTime'>
    readonly agentDeployedTokens: FieldRef<"Agent", 'String'>
    readonly ownerId: FieldRef<"Agent", 'String'>
    readonly createdAt: FieldRef<"Agent", 'DateTime'>
    readonly updatedAt: FieldRef<"Agent", 'DateTime'>
    readonly deployedAt: FieldRef<"Agent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Agent findUnique
   */
  export type AgentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findUniqueOrThrow
   */
  export type AgentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findFirst
   */
  export type AgentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findFirstOrThrow
   */
  export type AgentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findMany
   */
  export type AgentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agents to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent create
   */
  export type AgentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to create a Agent.
     */
    data: XOR<AgentCreateInput, AgentUncheckedCreateInput>
  }

  /**
   * Agent createMany
   */
  export type AgentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent createManyAndReturn
   */
  export type AgentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agent update
   */
  export type AgentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to update a Agent.
     */
    data: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
    /**
     * Choose, which Agent to update.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent updateMany
   */
  export type AgentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
  }

  /**
   * Agent updateManyAndReturn
   */
  export type AgentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agent upsert
   */
  export type AgentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The filter to search for the Agent to update in case it exists.
     */
    where: AgentWhereUniqueInput
    /**
     * In case the Agent found by the `where` argument doesn't exist, create a new Agent with this data.
     */
    create: XOR<AgentCreateInput, AgentUncheckedCreateInput>
    /**
     * In case the Agent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
  }

  /**
   * Agent delete
   */
  export type AgentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter which Agent to delete.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent deleteMany
   */
  export type AgentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agents to delete
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to delete.
     */
    limit?: number
  }

  /**
   * Agent.transactions
   */
  export type Agent$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Agent.activityLogs
   */
  export type Agent$activityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    cursor?: ActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * Agent.channelBindings
   */
  export type Agent$channelBindingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingInclude<ExtArgs> | null
    where?: ChannelBindingWhereInput
    orderBy?: ChannelBindingOrderByWithRelationInput | ChannelBindingOrderByWithRelationInput[]
    cursor?: ChannelBindingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChannelBindingScalarFieldEnum | ChannelBindingScalarFieldEnum[]
  }

  /**
   * Agent.verification
   */
  export type Agent$verificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationInclude<ExtArgs> | null
    where?: AgentVerificationWhereInput
  }

  /**
   * Agent.agentTasks
   */
  export type Agent$agentTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskInclude<ExtArgs> | null
    where?: AgentTaskWhereInput
    orderBy?: AgentTaskOrderByWithRelationInput | AgentTaskOrderByWithRelationInput[]
    cursor?: AgentTaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentTaskScalarFieldEnum | AgentTaskScalarFieldEnum[]
  }

  /**
   * Agent.ensRegistration
   */
  export type Agent$ensRegistrationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainInclude<ExtArgs> | null
    where?: EnsSubdomainWhereInput
  }

  /**
   * Agent without action
   */
  export type AgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
  }


  /**
   * Model ChannelBinding
   */

  export type AggregateChannelBinding = {
    _count: ChannelBindingCountAggregateOutputType | null
    _min: ChannelBindingMinAggregateOutputType | null
    _max: ChannelBindingMaxAggregateOutputType | null
  }

  export type ChannelBindingMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    userId: string | null
    channelType: string | null
    senderIdentifier: string | null
    senderName: string | null
    chatIdentifier: string | null
    pairingCode: string | null
    bindingType: string | null
    isActive: boolean | null
    pairedAt: Date | null
    lastMessageAt: Date | null
  }

  export type ChannelBindingMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    userId: string | null
    channelType: string | null
    senderIdentifier: string | null
    senderName: string | null
    chatIdentifier: string | null
    pairingCode: string | null
    bindingType: string | null
    isActive: boolean | null
    pairedAt: Date | null
    lastMessageAt: Date | null
  }

  export type ChannelBindingCountAggregateOutputType = {
    id: number
    agentId: number
    userId: number
    channelType: number
    senderIdentifier: number
    senderName: number
    chatIdentifier: number
    pairingCode: number
    bindingType: number
    isActive: number
    pairedAt: number
    lastMessageAt: number
    _all: number
  }


  export type ChannelBindingMinAggregateInputType = {
    id?: true
    agentId?: true
    userId?: true
    channelType?: true
    senderIdentifier?: true
    senderName?: true
    chatIdentifier?: true
    pairingCode?: true
    bindingType?: true
    isActive?: true
    pairedAt?: true
    lastMessageAt?: true
  }

  export type ChannelBindingMaxAggregateInputType = {
    id?: true
    agentId?: true
    userId?: true
    channelType?: true
    senderIdentifier?: true
    senderName?: true
    chatIdentifier?: true
    pairingCode?: true
    bindingType?: true
    isActive?: true
    pairedAt?: true
    lastMessageAt?: true
  }

  export type ChannelBindingCountAggregateInputType = {
    id?: true
    agentId?: true
    userId?: true
    channelType?: true
    senderIdentifier?: true
    senderName?: true
    chatIdentifier?: true
    pairingCode?: true
    bindingType?: true
    isActive?: true
    pairedAt?: true
    lastMessageAt?: true
    _all?: true
  }

  export type ChannelBindingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChannelBinding to aggregate.
     */
    where?: ChannelBindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChannelBindings to fetch.
     */
    orderBy?: ChannelBindingOrderByWithRelationInput | ChannelBindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChannelBindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChannelBindings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChannelBindings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChannelBindings
    **/
    _count?: true | ChannelBindingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChannelBindingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChannelBindingMaxAggregateInputType
  }

  export type GetChannelBindingAggregateType<T extends ChannelBindingAggregateArgs> = {
        [P in keyof T & keyof AggregateChannelBinding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChannelBinding[P]>
      : GetScalarType<T[P], AggregateChannelBinding[P]>
  }




  export type ChannelBindingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelBindingWhereInput
    orderBy?: ChannelBindingOrderByWithAggregationInput | ChannelBindingOrderByWithAggregationInput[]
    by: ChannelBindingScalarFieldEnum[] | ChannelBindingScalarFieldEnum
    having?: ChannelBindingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChannelBindingCountAggregateInputType | true
    _min?: ChannelBindingMinAggregateInputType
    _max?: ChannelBindingMaxAggregateInputType
  }

  export type ChannelBindingGroupByOutputType = {
    id: string
    agentId: string
    userId: string | null
    channelType: string
    senderIdentifier: string
    senderName: string | null
    chatIdentifier: string | null
    pairingCode: string | null
    bindingType: string
    isActive: boolean
    pairedAt: Date
    lastMessageAt: Date
    _count: ChannelBindingCountAggregateOutputType | null
    _min: ChannelBindingMinAggregateOutputType | null
    _max: ChannelBindingMaxAggregateOutputType | null
  }

  type GetChannelBindingGroupByPayload<T extends ChannelBindingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChannelBindingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChannelBindingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChannelBindingGroupByOutputType[P]>
            : GetScalarType<T[P], ChannelBindingGroupByOutputType[P]>
        }
      >
    >


  export type ChannelBindingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    userId?: boolean
    channelType?: boolean
    senderIdentifier?: boolean
    senderName?: boolean
    chatIdentifier?: boolean
    pairingCode?: boolean
    bindingType?: boolean
    isActive?: boolean
    pairedAt?: boolean
    lastMessageAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    user?: boolean | ChannelBinding$userArgs<ExtArgs>
    sessionMessages?: boolean | ChannelBinding$sessionMessagesArgs<ExtArgs>
    _count?: boolean | ChannelBindingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channelBinding"]>

  export type ChannelBindingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    userId?: boolean
    channelType?: boolean
    senderIdentifier?: boolean
    senderName?: boolean
    chatIdentifier?: boolean
    pairingCode?: boolean
    bindingType?: boolean
    isActive?: boolean
    pairedAt?: boolean
    lastMessageAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    user?: boolean | ChannelBinding$userArgs<ExtArgs>
  }, ExtArgs["result"]["channelBinding"]>

  export type ChannelBindingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    userId?: boolean
    channelType?: boolean
    senderIdentifier?: boolean
    senderName?: boolean
    chatIdentifier?: boolean
    pairingCode?: boolean
    bindingType?: boolean
    isActive?: boolean
    pairedAt?: boolean
    lastMessageAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    user?: boolean | ChannelBinding$userArgs<ExtArgs>
  }, ExtArgs["result"]["channelBinding"]>

  export type ChannelBindingSelectScalar = {
    id?: boolean
    agentId?: boolean
    userId?: boolean
    channelType?: boolean
    senderIdentifier?: boolean
    senderName?: boolean
    chatIdentifier?: boolean
    pairingCode?: boolean
    bindingType?: boolean
    isActive?: boolean
    pairedAt?: boolean
    lastMessageAt?: boolean
  }

  export type ChannelBindingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "userId" | "channelType" | "senderIdentifier" | "senderName" | "chatIdentifier" | "pairingCode" | "bindingType" | "isActive" | "pairedAt" | "lastMessageAt", ExtArgs["result"]["channelBinding"]>
  export type ChannelBindingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    user?: boolean | ChannelBinding$userArgs<ExtArgs>
    sessionMessages?: boolean | ChannelBinding$sessionMessagesArgs<ExtArgs>
    _count?: boolean | ChannelBindingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChannelBindingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    user?: boolean | ChannelBinding$userArgs<ExtArgs>
  }
  export type ChannelBindingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    user?: boolean | ChannelBinding$userArgs<ExtArgs>
  }

  export type $ChannelBindingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChannelBinding"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
      sessionMessages: Prisma.$SessionMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      userId: string | null
      channelType: string
      senderIdentifier: string
      senderName: string | null
      chatIdentifier: string | null
      pairingCode: string | null
      bindingType: string
      isActive: boolean
      pairedAt: Date
      lastMessageAt: Date
    }, ExtArgs["result"]["channelBinding"]>
    composites: {}
  }

  type ChannelBindingGetPayload<S extends boolean | null | undefined | ChannelBindingDefaultArgs> = $Result.GetResult<Prisma.$ChannelBindingPayload, S>

  type ChannelBindingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChannelBindingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChannelBindingCountAggregateInputType | true
    }

  export interface ChannelBindingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChannelBinding'], meta: { name: 'ChannelBinding' } }
    /**
     * Find zero or one ChannelBinding that matches the filter.
     * @param {ChannelBindingFindUniqueArgs} args - Arguments to find a ChannelBinding
     * @example
     * // Get one ChannelBinding
     * const channelBinding = await prisma.channelBinding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChannelBindingFindUniqueArgs>(args: SelectSubset<T, ChannelBindingFindUniqueArgs<ExtArgs>>): Prisma__ChannelBindingClient<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChannelBinding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChannelBindingFindUniqueOrThrowArgs} args - Arguments to find a ChannelBinding
     * @example
     * // Get one ChannelBinding
     * const channelBinding = await prisma.channelBinding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChannelBindingFindUniqueOrThrowArgs>(args: SelectSubset<T, ChannelBindingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChannelBindingClient<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChannelBinding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelBindingFindFirstArgs} args - Arguments to find a ChannelBinding
     * @example
     * // Get one ChannelBinding
     * const channelBinding = await prisma.channelBinding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChannelBindingFindFirstArgs>(args?: SelectSubset<T, ChannelBindingFindFirstArgs<ExtArgs>>): Prisma__ChannelBindingClient<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChannelBinding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelBindingFindFirstOrThrowArgs} args - Arguments to find a ChannelBinding
     * @example
     * // Get one ChannelBinding
     * const channelBinding = await prisma.channelBinding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChannelBindingFindFirstOrThrowArgs>(args?: SelectSubset<T, ChannelBindingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChannelBindingClient<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChannelBindings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelBindingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChannelBindings
     * const channelBindings = await prisma.channelBinding.findMany()
     * 
     * // Get first 10 ChannelBindings
     * const channelBindings = await prisma.channelBinding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const channelBindingWithIdOnly = await prisma.channelBinding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChannelBindingFindManyArgs>(args?: SelectSubset<T, ChannelBindingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChannelBinding.
     * @param {ChannelBindingCreateArgs} args - Arguments to create a ChannelBinding.
     * @example
     * // Create one ChannelBinding
     * const ChannelBinding = await prisma.channelBinding.create({
     *   data: {
     *     // ... data to create a ChannelBinding
     *   }
     * })
     * 
     */
    create<T extends ChannelBindingCreateArgs>(args: SelectSubset<T, ChannelBindingCreateArgs<ExtArgs>>): Prisma__ChannelBindingClient<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChannelBindings.
     * @param {ChannelBindingCreateManyArgs} args - Arguments to create many ChannelBindings.
     * @example
     * // Create many ChannelBindings
     * const channelBinding = await prisma.channelBinding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChannelBindingCreateManyArgs>(args?: SelectSubset<T, ChannelBindingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChannelBindings and returns the data saved in the database.
     * @param {ChannelBindingCreateManyAndReturnArgs} args - Arguments to create many ChannelBindings.
     * @example
     * // Create many ChannelBindings
     * const channelBinding = await prisma.channelBinding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChannelBindings and only return the `id`
     * const channelBindingWithIdOnly = await prisma.channelBinding.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChannelBindingCreateManyAndReturnArgs>(args?: SelectSubset<T, ChannelBindingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChannelBinding.
     * @param {ChannelBindingDeleteArgs} args - Arguments to delete one ChannelBinding.
     * @example
     * // Delete one ChannelBinding
     * const ChannelBinding = await prisma.channelBinding.delete({
     *   where: {
     *     // ... filter to delete one ChannelBinding
     *   }
     * })
     * 
     */
    delete<T extends ChannelBindingDeleteArgs>(args: SelectSubset<T, ChannelBindingDeleteArgs<ExtArgs>>): Prisma__ChannelBindingClient<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChannelBinding.
     * @param {ChannelBindingUpdateArgs} args - Arguments to update one ChannelBinding.
     * @example
     * // Update one ChannelBinding
     * const channelBinding = await prisma.channelBinding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChannelBindingUpdateArgs>(args: SelectSubset<T, ChannelBindingUpdateArgs<ExtArgs>>): Prisma__ChannelBindingClient<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChannelBindings.
     * @param {ChannelBindingDeleteManyArgs} args - Arguments to filter ChannelBindings to delete.
     * @example
     * // Delete a few ChannelBindings
     * const { count } = await prisma.channelBinding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChannelBindingDeleteManyArgs>(args?: SelectSubset<T, ChannelBindingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChannelBindings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelBindingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChannelBindings
     * const channelBinding = await prisma.channelBinding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChannelBindingUpdateManyArgs>(args: SelectSubset<T, ChannelBindingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChannelBindings and returns the data updated in the database.
     * @param {ChannelBindingUpdateManyAndReturnArgs} args - Arguments to update many ChannelBindings.
     * @example
     * // Update many ChannelBindings
     * const channelBinding = await prisma.channelBinding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChannelBindings and only return the `id`
     * const channelBindingWithIdOnly = await prisma.channelBinding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChannelBindingUpdateManyAndReturnArgs>(args: SelectSubset<T, ChannelBindingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChannelBinding.
     * @param {ChannelBindingUpsertArgs} args - Arguments to update or create a ChannelBinding.
     * @example
     * // Update or create a ChannelBinding
     * const channelBinding = await prisma.channelBinding.upsert({
     *   create: {
     *     // ... data to create a ChannelBinding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChannelBinding we want to update
     *   }
     * })
     */
    upsert<T extends ChannelBindingUpsertArgs>(args: SelectSubset<T, ChannelBindingUpsertArgs<ExtArgs>>): Prisma__ChannelBindingClient<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChannelBindings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelBindingCountArgs} args - Arguments to filter ChannelBindings to count.
     * @example
     * // Count the number of ChannelBindings
     * const count = await prisma.channelBinding.count({
     *   where: {
     *     // ... the filter for the ChannelBindings we want to count
     *   }
     * })
    **/
    count<T extends ChannelBindingCountArgs>(
      args?: Subset<T, ChannelBindingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChannelBindingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChannelBinding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelBindingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChannelBindingAggregateArgs>(args: Subset<T, ChannelBindingAggregateArgs>): Prisma.PrismaPromise<GetChannelBindingAggregateType<T>>

    /**
     * Group by ChannelBinding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelBindingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChannelBindingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChannelBindingGroupByArgs['orderBy'] }
        : { orderBy?: ChannelBindingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChannelBindingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChannelBindingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChannelBinding model
   */
  readonly fields: ChannelBindingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChannelBinding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChannelBindingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends ChannelBinding$userArgs<ExtArgs> = {}>(args?: Subset<T, ChannelBinding$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sessionMessages<T extends ChannelBinding$sessionMessagesArgs<ExtArgs> = {}>(args?: Subset<T, ChannelBinding$sessionMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChannelBinding model
   */
  interface ChannelBindingFieldRefs {
    readonly id: FieldRef<"ChannelBinding", 'String'>
    readonly agentId: FieldRef<"ChannelBinding", 'String'>
    readonly userId: FieldRef<"ChannelBinding", 'String'>
    readonly channelType: FieldRef<"ChannelBinding", 'String'>
    readonly senderIdentifier: FieldRef<"ChannelBinding", 'String'>
    readonly senderName: FieldRef<"ChannelBinding", 'String'>
    readonly chatIdentifier: FieldRef<"ChannelBinding", 'String'>
    readonly pairingCode: FieldRef<"ChannelBinding", 'String'>
    readonly bindingType: FieldRef<"ChannelBinding", 'String'>
    readonly isActive: FieldRef<"ChannelBinding", 'Boolean'>
    readonly pairedAt: FieldRef<"ChannelBinding", 'DateTime'>
    readonly lastMessageAt: FieldRef<"ChannelBinding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChannelBinding findUnique
   */
  export type ChannelBindingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingInclude<ExtArgs> | null
    /**
     * Filter, which ChannelBinding to fetch.
     */
    where: ChannelBindingWhereUniqueInput
  }

  /**
   * ChannelBinding findUniqueOrThrow
   */
  export type ChannelBindingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingInclude<ExtArgs> | null
    /**
     * Filter, which ChannelBinding to fetch.
     */
    where: ChannelBindingWhereUniqueInput
  }

  /**
   * ChannelBinding findFirst
   */
  export type ChannelBindingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingInclude<ExtArgs> | null
    /**
     * Filter, which ChannelBinding to fetch.
     */
    where?: ChannelBindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChannelBindings to fetch.
     */
    orderBy?: ChannelBindingOrderByWithRelationInput | ChannelBindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChannelBindings.
     */
    cursor?: ChannelBindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChannelBindings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChannelBindings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChannelBindings.
     */
    distinct?: ChannelBindingScalarFieldEnum | ChannelBindingScalarFieldEnum[]
  }

  /**
   * ChannelBinding findFirstOrThrow
   */
  export type ChannelBindingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingInclude<ExtArgs> | null
    /**
     * Filter, which ChannelBinding to fetch.
     */
    where?: ChannelBindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChannelBindings to fetch.
     */
    orderBy?: ChannelBindingOrderByWithRelationInput | ChannelBindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChannelBindings.
     */
    cursor?: ChannelBindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChannelBindings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChannelBindings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChannelBindings.
     */
    distinct?: ChannelBindingScalarFieldEnum | ChannelBindingScalarFieldEnum[]
  }

  /**
   * ChannelBinding findMany
   */
  export type ChannelBindingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingInclude<ExtArgs> | null
    /**
     * Filter, which ChannelBindings to fetch.
     */
    where?: ChannelBindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChannelBindings to fetch.
     */
    orderBy?: ChannelBindingOrderByWithRelationInput | ChannelBindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChannelBindings.
     */
    cursor?: ChannelBindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChannelBindings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChannelBindings.
     */
    skip?: number
    distinct?: ChannelBindingScalarFieldEnum | ChannelBindingScalarFieldEnum[]
  }

  /**
   * ChannelBinding create
   */
  export type ChannelBindingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingInclude<ExtArgs> | null
    /**
     * The data needed to create a ChannelBinding.
     */
    data: XOR<ChannelBindingCreateInput, ChannelBindingUncheckedCreateInput>
  }

  /**
   * ChannelBinding createMany
   */
  export type ChannelBindingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChannelBindings.
     */
    data: ChannelBindingCreateManyInput | ChannelBindingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChannelBinding createManyAndReturn
   */
  export type ChannelBindingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * The data used to create many ChannelBindings.
     */
    data: ChannelBindingCreateManyInput | ChannelBindingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChannelBinding update
   */
  export type ChannelBindingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingInclude<ExtArgs> | null
    /**
     * The data needed to update a ChannelBinding.
     */
    data: XOR<ChannelBindingUpdateInput, ChannelBindingUncheckedUpdateInput>
    /**
     * Choose, which ChannelBinding to update.
     */
    where: ChannelBindingWhereUniqueInput
  }

  /**
   * ChannelBinding updateMany
   */
  export type ChannelBindingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChannelBindings.
     */
    data: XOR<ChannelBindingUpdateManyMutationInput, ChannelBindingUncheckedUpdateManyInput>
    /**
     * Filter which ChannelBindings to update
     */
    where?: ChannelBindingWhereInput
    /**
     * Limit how many ChannelBindings to update.
     */
    limit?: number
  }

  /**
   * ChannelBinding updateManyAndReturn
   */
  export type ChannelBindingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * The data used to update ChannelBindings.
     */
    data: XOR<ChannelBindingUpdateManyMutationInput, ChannelBindingUncheckedUpdateManyInput>
    /**
     * Filter which ChannelBindings to update
     */
    where?: ChannelBindingWhereInput
    /**
     * Limit how many ChannelBindings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChannelBinding upsert
   */
  export type ChannelBindingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingInclude<ExtArgs> | null
    /**
     * The filter to search for the ChannelBinding to update in case it exists.
     */
    where: ChannelBindingWhereUniqueInput
    /**
     * In case the ChannelBinding found by the `where` argument doesn't exist, create a new ChannelBinding with this data.
     */
    create: XOR<ChannelBindingCreateInput, ChannelBindingUncheckedCreateInput>
    /**
     * In case the ChannelBinding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChannelBindingUpdateInput, ChannelBindingUncheckedUpdateInput>
  }

  /**
   * ChannelBinding delete
   */
  export type ChannelBindingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingInclude<ExtArgs> | null
    /**
     * Filter which ChannelBinding to delete.
     */
    where: ChannelBindingWhereUniqueInput
  }

  /**
   * ChannelBinding deleteMany
   */
  export type ChannelBindingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChannelBindings to delete
     */
    where?: ChannelBindingWhereInput
    /**
     * Limit how many ChannelBindings to delete.
     */
    limit?: number
  }

  /**
   * ChannelBinding.user
   */
  export type ChannelBinding$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ChannelBinding.sessionMessages
   */
  export type ChannelBinding$sessionMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageInclude<ExtArgs> | null
    where?: SessionMessageWhereInput
    orderBy?: SessionMessageOrderByWithRelationInput | SessionMessageOrderByWithRelationInput[]
    cursor?: SessionMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionMessageScalarFieldEnum | SessionMessageScalarFieldEnum[]
  }

  /**
   * ChannelBinding without action
   */
  export type ChannelBindingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelBinding
     */
    select?: ChannelBindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelBinding
     */
    omit?: ChannelBindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelBindingInclude<ExtArgs> | null
  }


  /**
   * Model SessionMessage
   */

  export type AggregateSessionMessage = {
    _count: SessionMessageCountAggregateOutputType | null
    _min: SessionMessageMinAggregateOutputType | null
    _max: SessionMessageMaxAggregateOutputType | null
  }

  export type SessionMessageMinAggregateOutputType = {
    id: string | null
    bindingId: string | null
    role: string | null
    content: string | null
    metadata: string | null
    createdAt: Date | null
  }

  export type SessionMessageMaxAggregateOutputType = {
    id: string | null
    bindingId: string | null
    role: string | null
    content: string | null
    metadata: string | null
    createdAt: Date | null
  }

  export type SessionMessageCountAggregateOutputType = {
    id: number
    bindingId: number
    role: number
    content: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type SessionMessageMinAggregateInputType = {
    id?: true
    bindingId?: true
    role?: true
    content?: true
    metadata?: true
    createdAt?: true
  }

  export type SessionMessageMaxAggregateInputType = {
    id?: true
    bindingId?: true
    role?: true
    content?: true
    metadata?: true
    createdAt?: true
  }

  export type SessionMessageCountAggregateInputType = {
    id?: true
    bindingId?: true
    role?: true
    content?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type SessionMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SessionMessage to aggregate.
     */
    where?: SessionMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionMessages to fetch.
     */
    orderBy?: SessionMessageOrderByWithRelationInput | SessionMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SessionMessages
    **/
    _count?: true | SessionMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMessageMaxAggregateInputType
  }

  export type GetSessionMessageAggregateType<T extends SessionMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateSessionMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSessionMessage[P]>
      : GetScalarType<T[P], AggregateSessionMessage[P]>
  }




  export type SessionMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionMessageWhereInput
    orderBy?: SessionMessageOrderByWithAggregationInput | SessionMessageOrderByWithAggregationInput[]
    by: SessionMessageScalarFieldEnum[] | SessionMessageScalarFieldEnum
    having?: SessionMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionMessageCountAggregateInputType | true
    _min?: SessionMessageMinAggregateInputType
    _max?: SessionMessageMaxAggregateInputType
  }

  export type SessionMessageGroupByOutputType = {
    id: string
    bindingId: string
    role: string
    content: string
    metadata: string | null
    createdAt: Date
    _count: SessionMessageCountAggregateOutputType | null
    _min: SessionMessageMinAggregateOutputType | null
    _max: SessionMessageMaxAggregateOutputType | null
  }

  type GetSessionMessageGroupByPayload<T extends SessionMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionMessageGroupByOutputType[P]>
            : GetScalarType<T[P], SessionMessageGroupByOutputType[P]>
        }
      >
    >


  export type SessionMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bindingId?: boolean
    role?: boolean
    content?: boolean
    metadata?: boolean
    createdAt?: boolean
    binding?: boolean | ChannelBindingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionMessage"]>

  export type SessionMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bindingId?: boolean
    role?: boolean
    content?: boolean
    metadata?: boolean
    createdAt?: boolean
    binding?: boolean | ChannelBindingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionMessage"]>

  export type SessionMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bindingId?: boolean
    role?: boolean
    content?: boolean
    metadata?: boolean
    createdAt?: boolean
    binding?: boolean | ChannelBindingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionMessage"]>

  export type SessionMessageSelectScalar = {
    id?: boolean
    bindingId?: boolean
    role?: boolean
    content?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type SessionMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bindingId" | "role" | "content" | "metadata" | "createdAt", ExtArgs["result"]["sessionMessage"]>
  export type SessionMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    binding?: boolean | ChannelBindingDefaultArgs<ExtArgs>
  }
  export type SessionMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    binding?: boolean | ChannelBindingDefaultArgs<ExtArgs>
  }
  export type SessionMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    binding?: boolean | ChannelBindingDefaultArgs<ExtArgs>
  }

  export type $SessionMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SessionMessage"
    objects: {
      binding: Prisma.$ChannelBindingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bindingId: string
      role: string
      content: string
      metadata: string | null
      createdAt: Date
    }, ExtArgs["result"]["sessionMessage"]>
    composites: {}
  }

  type SessionMessageGetPayload<S extends boolean | null | undefined | SessionMessageDefaultArgs> = $Result.GetResult<Prisma.$SessionMessagePayload, S>

  type SessionMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionMessageCountAggregateInputType | true
    }

  export interface SessionMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SessionMessage'], meta: { name: 'SessionMessage' } }
    /**
     * Find zero or one SessionMessage that matches the filter.
     * @param {SessionMessageFindUniqueArgs} args - Arguments to find a SessionMessage
     * @example
     * // Get one SessionMessage
     * const sessionMessage = await prisma.sessionMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionMessageFindUniqueArgs>(args: SelectSubset<T, SessionMessageFindUniqueArgs<ExtArgs>>): Prisma__SessionMessageClient<$Result.GetResult<Prisma.$SessionMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SessionMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionMessageFindUniqueOrThrowArgs} args - Arguments to find a SessionMessage
     * @example
     * // Get one SessionMessage
     * const sessionMessage = await prisma.sessionMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionMessageClient<$Result.GetResult<Prisma.$SessionMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SessionMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionMessageFindFirstArgs} args - Arguments to find a SessionMessage
     * @example
     * // Get one SessionMessage
     * const sessionMessage = await prisma.sessionMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionMessageFindFirstArgs>(args?: SelectSubset<T, SessionMessageFindFirstArgs<ExtArgs>>): Prisma__SessionMessageClient<$Result.GetResult<Prisma.$SessionMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SessionMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionMessageFindFirstOrThrowArgs} args - Arguments to find a SessionMessage
     * @example
     * // Get one SessionMessage
     * const sessionMessage = await prisma.sessionMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionMessageClient<$Result.GetResult<Prisma.$SessionMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SessionMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SessionMessages
     * const sessionMessages = await prisma.sessionMessage.findMany()
     * 
     * // Get first 10 SessionMessages
     * const sessionMessages = await prisma.sessionMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionMessageWithIdOnly = await prisma.sessionMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionMessageFindManyArgs>(args?: SelectSubset<T, SessionMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SessionMessage.
     * @param {SessionMessageCreateArgs} args - Arguments to create a SessionMessage.
     * @example
     * // Create one SessionMessage
     * const SessionMessage = await prisma.sessionMessage.create({
     *   data: {
     *     // ... data to create a SessionMessage
     *   }
     * })
     * 
     */
    create<T extends SessionMessageCreateArgs>(args: SelectSubset<T, SessionMessageCreateArgs<ExtArgs>>): Prisma__SessionMessageClient<$Result.GetResult<Prisma.$SessionMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SessionMessages.
     * @param {SessionMessageCreateManyArgs} args - Arguments to create many SessionMessages.
     * @example
     * // Create many SessionMessages
     * const sessionMessage = await prisma.sessionMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionMessageCreateManyArgs>(args?: SelectSubset<T, SessionMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SessionMessages and returns the data saved in the database.
     * @param {SessionMessageCreateManyAndReturnArgs} args - Arguments to create many SessionMessages.
     * @example
     * // Create many SessionMessages
     * const sessionMessage = await prisma.sessionMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SessionMessages and only return the `id`
     * const sessionMessageWithIdOnly = await prisma.sessionMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SessionMessage.
     * @param {SessionMessageDeleteArgs} args - Arguments to delete one SessionMessage.
     * @example
     * // Delete one SessionMessage
     * const SessionMessage = await prisma.sessionMessage.delete({
     *   where: {
     *     // ... filter to delete one SessionMessage
     *   }
     * })
     * 
     */
    delete<T extends SessionMessageDeleteArgs>(args: SelectSubset<T, SessionMessageDeleteArgs<ExtArgs>>): Prisma__SessionMessageClient<$Result.GetResult<Prisma.$SessionMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SessionMessage.
     * @param {SessionMessageUpdateArgs} args - Arguments to update one SessionMessage.
     * @example
     * // Update one SessionMessage
     * const sessionMessage = await prisma.sessionMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionMessageUpdateArgs>(args: SelectSubset<T, SessionMessageUpdateArgs<ExtArgs>>): Prisma__SessionMessageClient<$Result.GetResult<Prisma.$SessionMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SessionMessages.
     * @param {SessionMessageDeleteManyArgs} args - Arguments to filter SessionMessages to delete.
     * @example
     * // Delete a few SessionMessages
     * const { count } = await prisma.sessionMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionMessageDeleteManyArgs>(args?: SelectSubset<T, SessionMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SessionMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SessionMessages
     * const sessionMessage = await prisma.sessionMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionMessageUpdateManyArgs>(args: SelectSubset<T, SessionMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SessionMessages and returns the data updated in the database.
     * @param {SessionMessageUpdateManyAndReturnArgs} args - Arguments to update many SessionMessages.
     * @example
     * // Update many SessionMessages
     * const sessionMessage = await prisma.sessionMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SessionMessages and only return the `id`
     * const sessionMessageWithIdOnly = await prisma.sessionMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SessionMessage.
     * @param {SessionMessageUpsertArgs} args - Arguments to update or create a SessionMessage.
     * @example
     * // Update or create a SessionMessage
     * const sessionMessage = await prisma.sessionMessage.upsert({
     *   create: {
     *     // ... data to create a SessionMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SessionMessage we want to update
     *   }
     * })
     */
    upsert<T extends SessionMessageUpsertArgs>(args: SelectSubset<T, SessionMessageUpsertArgs<ExtArgs>>): Prisma__SessionMessageClient<$Result.GetResult<Prisma.$SessionMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SessionMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionMessageCountArgs} args - Arguments to filter SessionMessages to count.
     * @example
     * // Count the number of SessionMessages
     * const count = await prisma.sessionMessage.count({
     *   where: {
     *     // ... the filter for the SessionMessages we want to count
     *   }
     * })
    **/
    count<T extends SessionMessageCountArgs>(
      args?: Subset<T, SessionMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SessionMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionMessageAggregateArgs>(args: Subset<T, SessionMessageAggregateArgs>): Prisma.PrismaPromise<GetSessionMessageAggregateType<T>>

    /**
     * Group by SessionMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionMessageGroupByArgs['orderBy'] }
        : { orderBy?: SessionMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SessionMessage model
   */
  readonly fields: SessionMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SessionMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    binding<T extends ChannelBindingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChannelBindingDefaultArgs<ExtArgs>>): Prisma__ChannelBindingClient<$Result.GetResult<Prisma.$ChannelBindingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SessionMessage model
   */
  interface SessionMessageFieldRefs {
    readonly id: FieldRef<"SessionMessage", 'String'>
    readonly bindingId: FieldRef<"SessionMessage", 'String'>
    readonly role: FieldRef<"SessionMessage", 'String'>
    readonly content: FieldRef<"SessionMessage", 'String'>
    readonly metadata: FieldRef<"SessionMessage", 'String'>
    readonly createdAt: FieldRef<"SessionMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SessionMessage findUnique
   */
  export type SessionMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageInclude<ExtArgs> | null
    /**
     * Filter, which SessionMessage to fetch.
     */
    where: SessionMessageWhereUniqueInput
  }

  /**
   * SessionMessage findUniqueOrThrow
   */
  export type SessionMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageInclude<ExtArgs> | null
    /**
     * Filter, which SessionMessage to fetch.
     */
    where: SessionMessageWhereUniqueInput
  }

  /**
   * SessionMessage findFirst
   */
  export type SessionMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageInclude<ExtArgs> | null
    /**
     * Filter, which SessionMessage to fetch.
     */
    where?: SessionMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionMessages to fetch.
     */
    orderBy?: SessionMessageOrderByWithRelationInput | SessionMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SessionMessages.
     */
    cursor?: SessionMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SessionMessages.
     */
    distinct?: SessionMessageScalarFieldEnum | SessionMessageScalarFieldEnum[]
  }

  /**
   * SessionMessage findFirstOrThrow
   */
  export type SessionMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageInclude<ExtArgs> | null
    /**
     * Filter, which SessionMessage to fetch.
     */
    where?: SessionMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionMessages to fetch.
     */
    orderBy?: SessionMessageOrderByWithRelationInput | SessionMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SessionMessages.
     */
    cursor?: SessionMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SessionMessages.
     */
    distinct?: SessionMessageScalarFieldEnum | SessionMessageScalarFieldEnum[]
  }

  /**
   * SessionMessage findMany
   */
  export type SessionMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageInclude<ExtArgs> | null
    /**
     * Filter, which SessionMessages to fetch.
     */
    where?: SessionMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionMessages to fetch.
     */
    orderBy?: SessionMessageOrderByWithRelationInput | SessionMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SessionMessages.
     */
    cursor?: SessionMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionMessages.
     */
    skip?: number
    distinct?: SessionMessageScalarFieldEnum | SessionMessageScalarFieldEnum[]
  }

  /**
   * SessionMessage create
   */
  export type SessionMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a SessionMessage.
     */
    data: XOR<SessionMessageCreateInput, SessionMessageUncheckedCreateInput>
  }

  /**
   * SessionMessage createMany
   */
  export type SessionMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SessionMessages.
     */
    data: SessionMessageCreateManyInput | SessionMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SessionMessage createManyAndReturn
   */
  export type SessionMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * The data used to create many SessionMessages.
     */
    data: SessionMessageCreateManyInput | SessionMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SessionMessage update
   */
  export type SessionMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a SessionMessage.
     */
    data: XOR<SessionMessageUpdateInput, SessionMessageUncheckedUpdateInput>
    /**
     * Choose, which SessionMessage to update.
     */
    where: SessionMessageWhereUniqueInput
  }

  /**
   * SessionMessage updateMany
   */
  export type SessionMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SessionMessages.
     */
    data: XOR<SessionMessageUpdateManyMutationInput, SessionMessageUncheckedUpdateManyInput>
    /**
     * Filter which SessionMessages to update
     */
    where?: SessionMessageWhereInput
    /**
     * Limit how many SessionMessages to update.
     */
    limit?: number
  }

  /**
   * SessionMessage updateManyAndReturn
   */
  export type SessionMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * The data used to update SessionMessages.
     */
    data: XOR<SessionMessageUpdateManyMutationInput, SessionMessageUncheckedUpdateManyInput>
    /**
     * Filter which SessionMessages to update
     */
    where?: SessionMessageWhereInput
    /**
     * Limit how many SessionMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SessionMessage upsert
   */
  export type SessionMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the SessionMessage to update in case it exists.
     */
    where: SessionMessageWhereUniqueInput
    /**
     * In case the SessionMessage found by the `where` argument doesn't exist, create a new SessionMessage with this data.
     */
    create: XOR<SessionMessageCreateInput, SessionMessageUncheckedCreateInput>
    /**
     * In case the SessionMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionMessageUpdateInput, SessionMessageUncheckedUpdateInput>
  }

  /**
   * SessionMessage delete
   */
  export type SessionMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageInclude<ExtArgs> | null
    /**
     * Filter which SessionMessage to delete.
     */
    where: SessionMessageWhereUniqueInput
  }

  /**
   * SessionMessage deleteMany
   */
  export type SessionMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SessionMessages to delete
     */
    where?: SessionMessageWhereInput
    /**
     * Limit how many SessionMessages to delete.
     */
    limit?: number
  }

  /**
   * SessionMessage without action
   */
  export type SessionMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionMessage
     */
    select?: SessionMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionMessage
     */
    omit?: SessionMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionMessageInclude<ExtArgs> | null
  }


  /**
   * Model AgentVerification
   */

  export type AggregateAgentVerification = {
    _count: AgentVerificationCountAggregateOutputType | null
    _min: AgentVerificationMinAggregateOutputType | null
    _max: AgentVerificationMaxAggregateOutputType | null
  }

  export type AgentVerificationMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    publicKey: string | null
    encryptedPrivateKey: string | null
    status: string | null
    sessionId: string | null
    challenge: string | null
    humanId: string | null
    agentKeyHash: string | null
    agentName: string | null
    swarmUrl: string | null
    selfxyzVerified: boolean | null
    selfxyzRegisteredAt: Date | null
    selfAppConfig: string | null
    encryptedSelfclawApiKey: string | null
    verifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentVerificationMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    publicKey: string | null
    encryptedPrivateKey: string | null
    status: string | null
    sessionId: string | null
    challenge: string | null
    humanId: string | null
    agentKeyHash: string | null
    agentName: string | null
    swarmUrl: string | null
    selfxyzVerified: boolean | null
    selfxyzRegisteredAt: Date | null
    selfAppConfig: string | null
    encryptedSelfclawApiKey: string | null
    verifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentVerificationCountAggregateOutputType = {
    id: number
    agentId: number
    publicKey: number
    encryptedPrivateKey: number
    status: number
    sessionId: number
    challenge: number
    humanId: number
    agentKeyHash: number
    agentName: number
    swarmUrl: number
    selfxyzVerified: number
    selfxyzRegisteredAt: number
    selfAppConfig: number
    encryptedSelfclawApiKey: number
    verifiedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AgentVerificationMinAggregateInputType = {
    id?: true
    agentId?: true
    publicKey?: true
    encryptedPrivateKey?: true
    status?: true
    sessionId?: true
    challenge?: true
    humanId?: true
    agentKeyHash?: true
    agentName?: true
    swarmUrl?: true
    selfxyzVerified?: true
    selfxyzRegisteredAt?: true
    selfAppConfig?: true
    encryptedSelfclawApiKey?: true
    verifiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentVerificationMaxAggregateInputType = {
    id?: true
    agentId?: true
    publicKey?: true
    encryptedPrivateKey?: true
    status?: true
    sessionId?: true
    challenge?: true
    humanId?: true
    agentKeyHash?: true
    agentName?: true
    swarmUrl?: true
    selfxyzVerified?: true
    selfxyzRegisteredAt?: true
    selfAppConfig?: true
    encryptedSelfclawApiKey?: true
    verifiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentVerificationCountAggregateInputType = {
    id?: true
    agentId?: true
    publicKey?: true
    encryptedPrivateKey?: true
    status?: true
    sessionId?: true
    challenge?: true
    humanId?: true
    agentKeyHash?: true
    agentName?: true
    swarmUrl?: true
    selfxyzVerified?: true
    selfxyzRegisteredAt?: true
    selfAppConfig?: true
    encryptedSelfclawApiKey?: true
    verifiedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AgentVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentVerification to aggregate.
     */
    where?: AgentVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentVerifications to fetch.
     */
    orderBy?: AgentVerificationOrderByWithRelationInput | AgentVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentVerifications
    **/
    _count?: true | AgentVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentVerificationMaxAggregateInputType
  }

  export type GetAgentVerificationAggregateType<T extends AgentVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentVerification[P]>
      : GetScalarType<T[P], AggregateAgentVerification[P]>
  }




  export type AgentVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentVerificationWhereInput
    orderBy?: AgentVerificationOrderByWithAggregationInput | AgentVerificationOrderByWithAggregationInput[]
    by: AgentVerificationScalarFieldEnum[] | AgentVerificationScalarFieldEnum
    having?: AgentVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentVerificationCountAggregateInputType | true
    _min?: AgentVerificationMinAggregateInputType
    _max?: AgentVerificationMaxAggregateInputType
  }

  export type AgentVerificationGroupByOutputType = {
    id: string
    agentId: string
    publicKey: string
    encryptedPrivateKey: string
    status: string
    sessionId: string | null
    challenge: string | null
    humanId: string | null
    agentKeyHash: string | null
    agentName: string | null
    swarmUrl: string | null
    selfxyzVerified: boolean
    selfxyzRegisteredAt: Date | null
    selfAppConfig: string | null
    encryptedSelfclawApiKey: string | null
    verifiedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AgentVerificationCountAggregateOutputType | null
    _min: AgentVerificationMinAggregateOutputType | null
    _max: AgentVerificationMaxAggregateOutputType | null
  }

  type GetAgentVerificationGroupByPayload<T extends AgentVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], AgentVerificationGroupByOutputType[P]>
        }
      >
    >


  export type AgentVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    publicKey?: boolean
    encryptedPrivateKey?: boolean
    status?: boolean
    sessionId?: boolean
    challenge?: boolean
    humanId?: boolean
    agentKeyHash?: boolean
    agentName?: boolean
    swarmUrl?: boolean
    selfxyzVerified?: boolean
    selfxyzRegisteredAt?: boolean
    selfAppConfig?: boolean
    encryptedSelfclawApiKey?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentVerification"]>

  export type AgentVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    publicKey?: boolean
    encryptedPrivateKey?: boolean
    status?: boolean
    sessionId?: boolean
    challenge?: boolean
    humanId?: boolean
    agentKeyHash?: boolean
    agentName?: boolean
    swarmUrl?: boolean
    selfxyzVerified?: boolean
    selfxyzRegisteredAt?: boolean
    selfAppConfig?: boolean
    encryptedSelfclawApiKey?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentVerification"]>

  export type AgentVerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    publicKey?: boolean
    encryptedPrivateKey?: boolean
    status?: boolean
    sessionId?: boolean
    challenge?: boolean
    humanId?: boolean
    agentKeyHash?: boolean
    agentName?: boolean
    swarmUrl?: boolean
    selfxyzVerified?: boolean
    selfxyzRegisteredAt?: boolean
    selfAppConfig?: boolean
    encryptedSelfclawApiKey?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentVerification"]>

  export type AgentVerificationSelectScalar = {
    id?: boolean
    agentId?: boolean
    publicKey?: boolean
    encryptedPrivateKey?: boolean
    status?: boolean
    sessionId?: boolean
    challenge?: boolean
    humanId?: boolean
    agentKeyHash?: boolean
    agentName?: boolean
    swarmUrl?: boolean
    selfxyzVerified?: boolean
    selfxyzRegisteredAt?: boolean
    selfAppConfig?: boolean
    encryptedSelfclawApiKey?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AgentVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "publicKey" | "encryptedPrivateKey" | "status" | "sessionId" | "challenge" | "humanId" | "agentKeyHash" | "agentName" | "swarmUrl" | "selfxyzVerified" | "selfxyzRegisteredAt" | "selfAppConfig" | "encryptedSelfclawApiKey" | "verifiedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["agentVerification"]>
  export type AgentVerificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type AgentVerificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type AgentVerificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $AgentVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentVerification"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      publicKey: string
      encryptedPrivateKey: string
      status: string
      sessionId: string | null
      challenge: string | null
      humanId: string | null
      agentKeyHash: string | null
      agentName: string | null
      swarmUrl: string | null
      selfxyzVerified: boolean
      selfxyzRegisteredAt: Date | null
      selfAppConfig: string | null
      encryptedSelfclawApiKey: string | null
      verifiedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["agentVerification"]>
    composites: {}
  }

  type AgentVerificationGetPayload<S extends boolean | null | undefined | AgentVerificationDefaultArgs> = $Result.GetResult<Prisma.$AgentVerificationPayload, S>

  type AgentVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentVerificationCountAggregateInputType | true
    }

  export interface AgentVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentVerification'], meta: { name: 'AgentVerification' } }
    /**
     * Find zero or one AgentVerification that matches the filter.
     * @param {AgentVerificationFindUniqueArgs} args - Arguments to find a AgentVerification
     * @example
     * // Get one AgentVerification
     * const agentVerification = await prisma.agentVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentVerificationFindUniqueArgs>(args: SelectSubset<T, AgentVerificationFindUniqueArgs<ExtArgs>>): Prisma__AgentVerificationClient<$Result.GetResult<Prisma.$AgentVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgentVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentVerificationFindUniqueOrThrowArgs} args - Arguments to find a AgentVerification
     * @example
     * // Get one AgentVerification
     * const agentVerification = await prisma.agentVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentVerificationClient<$Result.GetResult<Prisma.$AgentVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVerificationFindFirstArgs} args - Arguments to find a AgentVerification
     * @example
     * // Get one AgentVerification
     * const agentVerification = await prisma.agentVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentVerificationFindFirstArgs>(args?: SelectSubset<T, AgentVerificationFindFirstArgs<ExtArgs>>): Prisma__AgentVerificationClient<$Result.GetResult<Prisma.$AgentVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVerificationFindFirstOrThrowArgs} args - Arguments to find a AgentVerification
     * @example
     * // Get one AgentVerification
     * const agentVerification = await prisma.agentVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentVerificationClient<$Result.GetResult<Prisma.$AgentVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentVerifications
     * const agentVerifications = await prisma.agentVerification.findMany()
     * 
     * // Get first 10 AgentVerifications
     * const agentVerifications = await prisma.agentVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentVerificationWithIdOnly = await prisma.agentVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentVerificationFindManyArgs>(args?: SelectSubset<T, AgentVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgentVerification.
     * @param {AgentVerificationCreateArgs} args - Arguments to create a AgentVerification.
     * @example
     * // Create one AgentVerification
     * const AgentVerification = await prisma.agentVerification.create({
     *   data: {
     *     // ... data to create a AgentVerification
     *   }
     * })
     * 
     */
    create<T extends AgentVerificationCreateArgs>(args: SelectSubset<T, AgentVerificationCreateArgs<ExtArgs>>): Prisma__AgentVerificationClient<$Result.GetResult<Prisma.$AgentVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgentVerifications.
     * @param {AgentVerificationCreateManyArgs} args - Arguments to create many AgentVerifications.
     * @example
     * // Create many AgentVerifications
     * const agentVerification = await prisma.agentVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentVerificationCreateManyArgs>(args?: SelectSubset<T, AgentVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentVerifications and returns the data saved in the database.
     * @param {AgentVerificationCreateManyAndReturnArgs} args - Arguments to create many AgentVerifications.
     * @example
     * // Create many AgentVerifications
     * const agentVerification = await prisma.agentVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentVerifications and only return the `id`
     * const agentVerificationWithIdOnly = await prisma.agentVerification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AgentVerification.
     * @param {AgentVerificationDeleteArgs} args - Arguments to delete one AgentVerification.
     * @example
     * // Delete one AgentVerification
     * const AgentVerification = await prisma.agentVerification.delete({
     *   where: {
     *     // ... filter to delete one AgentVerification
     *   }
     * })
     * 
     */
    delete<T extends AgentVerificationDeleteArgs>(args: SelectSubset<T, AgentVerificationDeleteArgs<ExtArgs>>): Prisma__AgentVerificationClient<$Result.GetResult<Prisma.$AgentVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgentVerification.
     * @param {AgentVerificationUpdateArgs} args - Arguments to update one AgentVerification.
     * @example
     * // Update one AgentVerification
     * const agentVerification = await prisma.agentVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentVerificationUpdateArgs>(args: SelectSubset<T, AgentVerificationUpdateArgs<ExtArgs>>): Prisma__AgentVerificationClient<$Result.GetResult<Prisma.$AgentVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgentVerifications.
     * @param {AgentVerificationDeleteManyArgs} args - Arguments to filter AgentVerifications to delete.
     * @example
     * // Delete a few AgentVerifications
     * const { count } = await prisma.agentVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentVerificationDeleteManyArgs>(args?: SelectSubset<T, AgentVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentVerifications
     * const agentVerification = await prisma.agentVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentVerificationUpdateManyArgs>(args: SelectSubset<T, AgentVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentVerifications and returns the data updated in the database.
     * @param {AgentVerificationUpdateManyAndReturnArgs} args - Arguments to update many AgentVerifications.
     * @example
     * // Update many AgentVerifications
     * const agentVerification = await prisma.agentVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgentVerifications and only return the `id`
     * const agentVerificationWithIdOnly = await prisma.agentVerification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentVerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AgentVerification.
     * @param {AgentVerificationUpsertArgs} args - Arguments to update or create a AgentVerification.
     * @example
     * // Update or create a AgentVerification
     * const agentVerification = await prisma.agentVerification.upsert({
     *   create: {
     *     // ... data to create a AgentVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentVerification we want to update
     *   }
     * })
     */
    upsert<T extends AgentVerificationUpsertArgs>(args: SelectSubset<T, AgentVerificationUpsertArgs<ExtArgs>>): Prisma__AgentVerificationClient<$Result.GetResult<Prisma.$AgentVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AgentVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVerificationCountArgs} args - Arguments to filter AgentVerifications to count.
     * @example
     * // Count the number of AgentVerifications
     * const count = await prisma.agentVerification.count({
     *   where: {
     *     // ... the filter for the AgentVerifications we want to count
     *   }
     * })
    **/
    count<T extends AgentVerificationCountArgs>(
      args?: Subset<T, AgentVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentVerificationAggregateArgs>(args: Subset<T, AgentVerificationAggregateArgs>): Prisma.PrismaPromise<GetAgentVerificationAggregateType<T>>

    /**
     * Group by AgentVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentVerificationGroupByArgs['orderBy'] }
        : { orderBy?: AgentVerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentVerification model
   */
  readonly fields: AgentVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentVerification model
   */
  interface AgentVerificationFieldRefs {
    readonly id: FieldRef<"AgentVerification", 'String'>
    readonly agentId: FieldRef<"AgentVerification", 'String'>
    readonly publicKey: FieldRef<"AgentVerification", 'String'>
    readonly encryptedPrivateKey: FieldRef<"AgentVerification", 'String'>
    readonly status: FieldRef<"AgentVerification", 'String'>
    readonly sessionId: FieldRef<"AgentVerification", 'String'>
    readonly challenge: FieldRef<"AgentVerification", 'String'>
    readonly humanId: FieldRef<"AgentVerification", 'String'>
    readonly agentKeyHash: FieldRef<"AgentVerification", 'String'>
    readonly agentName: FieldRef<"AgentVerification", 'String'>
    readonly swarmUrl: FieldRef<"AgentVerification", 'String'>
    readonly selfxyzVerified: FieldRef<"AgentVerification", 'Boolean'>
    readonly selfxyzRegisteredAt: FieldRef<"AgentVerification", 'DateTime'>
    readonly selfAppConfig: FieldRef<"AgentVerification", 'String'>
    readonly encryptedSelfclawApiKey: FieldRef<"AgentVerification", 'String'>
    readonly verifiedAt: FieldRef<"AgentVerification", 'DateTime'>
    readonly createdAt: FieldRef<"AgentVerification", 'DateTime'>
    readonly updatedAt: FieldRef<"AgentVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentVerification findUnique
   */
  export type AgentVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationInclude<ExtArgs> | null
    /**
     * Filter, which AgentVerification to fetch.
     */
    where: AgentVerificationWhereUniqueInput
  }

  /**
   * AgentVerification findUniqueOrThrow
   */
  export type AgentVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationInclude<ExtArgs> | null
    /**
     * Filter, which AgentVerification to fetch.
     */
    where: AgentVerificationWhereUniqueInput
  }

  /**
   * AgentVerification findFirst
   */
  export type AgentVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationInclude<ExtArgs> | null
    /**
     * Filter, which AgentVerification to fetch.
     */
    where?: AgentVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentVerifications to fetch.
     */
    orderBy?: AgentVerificationOrderByWithRelationInput | AgentVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentVerifications.
     */
    cursor?: AgentVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentVerifications.
     */
    distinct?: AgentVerificationScalarFieldEnum | AgentVerificationScalarFieldEnum[]
  }

  /**
   * AgentVerification findFirstOrThrow
   */
  export type AgentVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationInclude<ExtArgs> | null
    /**
     * Filter, which AgentVerification to fetch.
     */
    where?: AgentVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentVerifications to fetch.
     */
    orderBy?: AgentVerificationOrderByWithRelationInput | AgentVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentVerifications.
     */
    cursor?: AgentVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentVerifications.
     */
    distinct?: AgentVerificationScalarFieldEnum | AgentVerificationScalarFieldEnum[]
  }

  /**
   * AgentVerification findMany
   */
  export type AgentVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationInclude<ExtArgs> | null
    /**
     * Filter, which AgentVerifications to fetch.
     */
    where?: AgentVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentVerifications to fetch.
     */
    orderBy?: AgentVerificationOrderByWithRelationInput | AgentVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentVerifications.
     */
    cursor?: AgentVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentVerifications.
     */
    skip?: number
    distinct?: AgentVerificationScalarFieldEnum | AgentVerificationScalarFieldEnum[]
  }

  /**
   * AgentVerification create
   */
  export type AgentVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentVerification.
     */
    data: XOR<AgentVerificationCreateInput, AgentVerificationUncheckedCreateInput>
  }

  /**
   * AgentVerification createMany
   */
  export type AgentVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentVerifications.
     */
    data: AgentVerificationCreateManyInput | AgentVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentVerification createManyAndReturn
   */
  export type AgentVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * The data used to create many AgentVerifications.
     */
    data: AgentVerificationCreateManyInput | AgentVerificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentVerification update
   */
  export type AgentVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentVerification.
     */
    data: XOR<AgentVerificationUpdateInput, AgentVerificationUncheckedUpdateInput>
    /**
     * Choose, which AgentVerification to update.
     */
    where: AgentVerificationWhereUniqueInput
  }

  /**
   * AgentVerification updateMany
   */
  export type AgentVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentVerifications.
     */
    data: XOR<AgentVerificationUpdateManyMutationInput, AgentVerificationUncheckedUpdateManyInput>
    /**
     * Filter which AgentVerifications to update
     */
    where?: AgentVerificationWhereInput
    /**
     * Limit how many AgentVerifications to update.
     */
    limit?: number
  }

  /**
   * AgentVerification updateManyAndReturn
   */
  export type AgentVerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * The data used to update AgentVerifications.
     */
    data: XOR<AgentVerificationUpdateManyMutationInput, AgentVerificationUncheckedUpdateManyInput>
    /**
     * Filter which AgentVerifications to update
     */
    where?: AgentVerificationWhereInput
    /**
     * Limit how many AgentVerifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentVerification upsert
   */
  export type AgentVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentVerification to update in case it exists.
     */
    where: AgentVerificationWhereUniqueInput
    /**
     * In case the AgentVerification found by the `where` argument doesn't exist, create a new AgentVerification with this data.
     */
    create: XOR<AgentVerificationCreateInput, AgentVerificationUncheckedCreateInput>
    /**
     * In case the AgentVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentVerificationUpdateInput, AgentVerificationUncheckedUpdateInput>
  }

  /**
   * AgentVerification delete
   */
  export type AgentVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationInclude<ExtArgs> | null
    /**
     * Filter which AgentVerification to delete.
     */
    where: AgentVerificationWhereUniqueInput
  }

  /**
   * AgentVerification deleteMany
   */
  export type AgentVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentVerifications to delete
     */
    where?: AgentVerificationWhereInput
    /**
     * Limit how many AgentVerifications to delete.
     */
    limit?: number
  }

  /**
   * AgentVerification without action
   */
  export type AgentVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVerification
     */
    select?: AgentVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentVerification
     */
    omit?: AgentVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVerificationInclude<ExtArgs> | null
  }


  /**
   * Model QRCode
   */

  export type AggregateQRCode = {
    _count: QRCodeCountAggregateOutputType | null
    _min: QRCodeMinAggregateOutputType | null
    _max: QRCodeMaxAggregateOutputType | null
  }

  export type QRCodeMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    content: string | null
    dataUrl: string | null
    createdAt: Date | null
  }

  export type QRCodeMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    content: string | null
    dataUrl: string | null
    createdAt: Date | null
  }

  export type QRCodeCountAggregateOutputType = {
    id: number
    agentId: number
    content: number
    dataUrl: number
    createdAt: number
    _all: number
  }


  export type QRCodeMinAggregateInputType = {
    id?: true
    agentId?: true
    content?: true
    dataUrl?: true
    createdAt?: true
  }

  export type QRCodeMaxAggregateInputType = {
    id?: true
    agentId?: true
    content?: true
    dataUrl?: true
    createdAt?: true
  }

  export type QRCodeCountAggregateInputType = {
    id?: true
    agentId?: true
    content?: true
    dataUrl?: true
    createdAt?: true
    _all?: true
  }

  export type QRCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QRCode to aggregate.
     */
    where?: QRCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRCodes to fetch.
     */
    orderBy?: QRCodeOrderByWithRelationInput | QRCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QRCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QRCodes
    **/
    _count?: true | QRCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QRCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QRCodeMaxAggregateInputType
  }

  export type GetQRCodeAggregateType<T extends QRCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateQRCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQRCode[P]>
      : GetScalarType<T[P], AggregateQRCode[P]>
  }




  export type QRCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QRCodeWhereInput
    orderBy?: QRCodeOrderByWithAggregationInput | QRCodeOrderByWithAggregationInput[]
    by: QRCodeScalarFieldEnum[] | QRCodeScalarFieldEnum
    having?: QRCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QRCodeCountAggregateInputType | true
    _min?: QRCodeMinAggregateInputType
    _max?: QRCodeMaxAggregateInputType
  }

  export type QRCodeGroupByOutputType = {
    id: string
    agentId: string | null
    content: string
    dataUrl: string
    createdAt: Date
    _count: QRCodeCountAggregateOutputType | null
    _min: QRCodeMinAggregateOutputType | null
    _max: QRCodeMaxAggregateOutputType | null
  }

  type GetQRCodeGroupByPayload<T extends QRCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QRCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QRCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QRCodeGroupByOutputType[P]>
            : GetScalarType<T[P], QRCodeGroupByOutputType[P]>
        }
      >
    >


  export type QRCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    content?: boolean
    dataUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["qRCode"]>

  export type QRCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    content?: boolean
    dataUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["qRCode"]>

  export type QRCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    content?: boolean
    dataUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["qRCode"]>

  export type QRCodeSelectScalar = {
    id?: boolean
    agentId?: boolean
    content?: boolean
    dataUrl?: boolean
    createdAt?: boolean
  }

  export type QRCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "content" | "dataUrl" | "createdAt", ExtArgs["result"]["qRCode"]>

  export type $QRCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QRCode"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string | null
      content: string
      dataUrl: string
      createdAt: Date
    }, ExtArgs["result"]["qRCode"]>
    composites: {}
  }

  type QRCodeGetPayload<S extends boolean | null | undefined | QRCodeDefaultArgs> = $Result.GetResult<Prisma.$QRCodePayload, S>

  type QRCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QRCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QRCodeCountAggregateInputType | true
    }

  export interface QRCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QRCode'], meta: { name: 'QRCode' } }
    /**
     * Find zero or one QRCode that matches the filter.
     * @param {QRCodeFindUniqueArgs} args - Arguments to find a QRCode
     * @example
     * // Get one QRCode
     * const qRCode = await prisma.qRCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QRCodeFindUniqueArgs>(args: SelectSubset<T, QRCodeFindUniqueArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QRCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QRCodeFindUniqueOrThrowArgs} args - Arguments to find a QRCode
     * @example
     * // Get one QRCode
     * const qRCode = await prisma.qRCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QRCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, QRCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QRCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeFindFirstArgs} args - Arguments to find a QRCode
     * @example
     * // Get one QRCode
     * const qRCode = await prisma.qRCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QRCodeFindFirstArgs>(args?: SelectSubset<T, QRCodeFindFirstArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QRCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeFindFirstOrThrowArgs} args - Arguments to find a QRCode
     * @example
     * // Get one QRCode
     * const qRCode = await prisma.qRCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QRCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, QRCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QRCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QRCodes
     * const qRCodes = await prisma.qRCode.findMany()
     * 
     * // Get first 10 QRCodes
     * const qRCodes = await prisma.qRCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const qRCodeWithIdOnly = await prisma.qRCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QRCodeFindManyArgs>(args?: SelectSubset<T, QRCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QRCode.
     * @param {QRCodeCreateArgs} args - Arguments to create a QRCode.
     * @example
     * // Create one QRCode
     * const QRCode = await prisma.qRCode.create({
     *   data: {
     *     // ... data to create a QRCode
     *   }
     * })
     * 
     */
    create<T extends QRCodeCreateArgs>(args: SelectSubset<T, QRCodeCreateArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QRCodes.
     * @param {QRCodeCreateManyArgs} args - Arguments to create many QRCodes.
     * @example
     * // Create many QRCodes
     * const qRCode = await prisma.qRCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QRCodeCreateManyArgs>(args?: SelectSubset<T, QRCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QRCodes and returns the data saved in the database.
     * @param {QRCodeCreateManyAndReturnArgs} args - Arguments to create many QRCodes.
     * @example
     * // Create many QRCodes
     * const qRCode = await prisma.qRCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QRCodes and only return the `id`
     * const qRCodeWithIdOnly = await prisma.qRCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QRCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, QRCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QRCode.
     * @param {QRCodeDeleteArgs} args - Arguments to delete one QRCode.
     * @example
     * // Delete one QRCode
     * const QRCode = await prisma.qRCode.delete({
     *   where: {
     *     // ... filter to delete one QRCode
     *   }
     * })
     * 
     */
    delete<T extends QRCodeDeleteArgs>(args: SelectSubset<T, QRCodeDeleteArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QRCode.
     * @param {QRCodeUpdateArgs} args - Arguments to update one QRCode.
     * @example
     * // Update one QRCode
     * const qRCode = await prisma.qRCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QRCodeUpdateArgs>(args: SelectSubset<T, QRCodeUpdateArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QRCodes.
     * @param {QRCodeDeleteManyArgs} args - Arguments to filter QRCodes to delete.
     * @example
     * // Delete a few QRCodes
     * const { count } = await prisma.qRCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QRCodeDeleteManyArgs>(args?: SelectSubset<T, QRCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QRCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QRCodes
     * const qRCode = await prisma.qRCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QRCodeUpdateManyArgs>(args: SelectSubset<T, QRCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QRCodes and returns the data updated in the database.
     * @param {QRCodeUpdateManyAndReturnArgs} args - Arguments to update many QRCodes.
     * @example
     * // Update many QRCodes
     * const qRCode = await prisma.qRCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QRCodes and only return the `id`
     * const qRCodeWithIdOnly = await prisma.qRCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QRCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, QRCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QRCode.
     * @param {QRCodeUpsertArgs} args - Arguments to update or create a QRCode.
     * @example
     * // Update or create a QRCode
     * const qRCode = await prisma.qRCode.upsert({
     *   create: {
     *     // ... data to create a QRCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QRCode we want to update
     *   }
     * })
     */
    upsert<T extends QRCodeUpsertArgs>(args: SelectSubset<T, QRCodeUpsertArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QRCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeCountArgs} args - Arguments to filter QRCodes to count.
     * @example
     * // Count the number of QRCodes
     * const count = await prisma.qRCode.count({
     *   where: {
     *     // ... the filter for the QRCodes we want to count
     *   }
     * })
    **/
    count<T extends QRCodeCountArgs>(
      args?: Subset<T, QRCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QRCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QRCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QRCodeAggregateArgs>(args: Subset<T, QRCodeAggregateArgs>): Prisma.PrismaPromise<GetQRCodeAggregateType<T>>

    /**
     * Group by QRCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QRCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QRCodeGroupByArgs['orderBy'] }
        : { orderBy?: QRCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QRCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQRCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QRCode model
   */
  readonly fields: QRCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QRCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QRCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QRCode model
   */
  interface QRCodeFieldRefs {
    readonly id: FieldRef<"QRCode", 'String'>
    readonly agentId: FieldRef<"QRCode", 'String'>
    readonly content: FieldRef<"QRCode", 'String'>
    readonly dataUrl: FieldRef<"QRCode", 'String'>
    readonly createdAt: FieldRef<"QRCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QRCode findUnique
   */
  export type QRCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Filter, which QRCode to fetch.
     */
    where: QRCodeWhereUniqueInput
  }

  /**
   * QRCode findUniqueOrThrow
   */
  export type QRCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Filter, which QRCode to fetch.
     */
    where: QRCodeWhereUniqueInput
  }

  /**
   * QRCode findFirst
   */
  export type QRCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Filter, which QRCode to fetch.
     */
    where?: QRCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRCodes to fetch.
     */
    orderBy?: QRCodeOrderByWithRelationInput | QRCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QRCodes.
     */
    cursor?: QRCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QRCodes.
     */
    distinct?: QRCodeScalarFieldEnum | QRCodeScalarFieldEnum[]
  }

  /**
   * QRCode findFirstOrThrow
   */
  export type QRCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Filter, which QRCode to fetch.
     */
    where?: QRCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRCodes to fetch.
     */
    orderBy?: QRCodeOrderByWithRelationInput | QRCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QRCodes.
     */
    cursor?: QRCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QRCodes.
     */
    distinct?: QRCodeScalarFieldEnum | QRCodeScalarFieldEnum[]
  }

  /**
   * QRCode findMany
   */
  export type QRCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Filter, which QRCodes to fetch.
     */
    where?: QRCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRCodes to fetch.
     */
    orderBy?: QRCodeOrderByWithRelationInput | QRCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QRCodes.
     */
    cursor?: QRCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRCodes.
     */
    skip?: number
    distinct?: QRCodeScalarFieldEnum | QRCodeScalarFieldEnum[]
  }

  /**
   * QRCode create
   */
  export type QRCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * The data needed to create a QRCode.
     */
    data: XOR<QRCodeCreateInput, QRCodeUncheckedCreateInput>
  }

  /**
   * QRCode createMany
   */
  export type QRCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QRCodes.
     */
    data: QRCodeCreateManyInput | QRCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QRCode createManyAndReturn
   */
  export type QRCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * The data used to create many QRCodes.
     */
    data: QRCodeCreateManyInput | QRCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QRCode update
   */
  export type QRCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * The data needed to update a QRCode.
     */
    data: XOR<QRCodeUpdateInput, QRCodeUncheckedUpdateInput>
    /**
     * Choose, which QRCode to update.
     */
    where: QRCodeWhereUniqueInput
  }

  /**
   * QRCode updateMany
   */
  export type QRCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QRCodes.
     */
    data: XOR<QRCodeUpdateManyMutationInput, QRCodeUncheckedUpdateManyInput>
    /**
     * Filter which QRCodes to update
     */
    where?: QRCodeWhereInput
    /**
     * Limit how many QRCodes to update.
     */
    limit?: number
  }

  /**
   * QRCode updateManyAndReturn
   */
  export type QRCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * The data used to update QRCodes.
     */
    data: XOR<QRCodeUpdateManyMutationInput, QRCodeUncheckedUpdateManyInput>
    /**
     * Filter which QRCodes to update
     */
    where?: QRCodeWhereInput
    /**
     * Limit how many QRCodes to update.
     */
    limit?: number
  }

  /**
   * QRCode upsert
   */
  export type QRCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * The filter to search for the QRCode to update in case it exists.
     */
    where: QRCodeWhereUniqueInput
    /**
     * In case the QRCode found by the `where` argument doesn't exist, create a new QRCode with this data.
     */
    create: XOR<QRCodeCreateInput, QRCodeUncheckedCreateInput>
    /**
     * In case the QRCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QRCodeUpdateInput, QRCodeUncheckedUpdateInput>
  }

  /**
   * QRCode delete
   */
  export type QRCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Filter which QRCode to delete.
     */
    where: QRCodeWhereUniqueInput
  }

  /**
   * QRCode deleteMany
   */
  export type QRCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QRCodes to delete
     */
    where?: QRCodeWhereInput
    /**
     * Limit how many QRCodes to delete.
     */
    limit?: number
  }

  /**
   * QRCode without action
   */
  export type QRCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: number | null
    gasUsed: number | null
    blockNumber: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: number | null
    gasUsed: number | null
    blockNumber: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    txHash: string | null
    type: string | null
    status: string | null
    fromAddress: string | null
    toAddress: string | null
    amount: number | null
    currency: string | null
    gasUsed: number | null
    blockNumber: number | null
    description: string | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    txHash: string | null
    type: string | null
    status: string | null
    fromAddress: string | null
    toAddress: string | null
    amount: number | null
    currency: string | null
    gasUsed: number | null
    blockNumber: number | null
    description: string | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    agentId: number
    txHash: number
    type: number
    status: number
    fromAddress: number
    toAddress: number
    amount: number
    currency: number
    gasUsed: number
    blockNumber: number
    description: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
    gasUsed?: true
    blockNumber?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
    gasUsed?: true
    blockNumber?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    agentId?: true
    txHash?: true
    type?: true
    status?: true
    fromAddress?: true
    toAddress?: true
    amount?: true
    currency?: true
    gasUsed?: true
    blockNumber?: true
    description?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    agentId?: true
    txHash?: true
    type?: true
    status?: true
    fromAddress?: true
    toAddress?: true
    amount?: true
    currency?: true
    gasUsed?: true
    blockNumber?: true
    description?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    agentId?: true
    txHash?: true
    type?: true
    status?: true
    fromAddress?: true
    toAddress?: true
    amount?: true
    currency?: true
    gasUsed?: true
    blockNumber?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    agentId: string
    txHash: string | null
    type: string
    status: string
    fromAddress: string | null
    toAddress: string | null
    amount: number | null
    currency: string | null
    gasUsed: number | null
    blockNumber: number | null
    description: string | null
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    txHash?: boolean
    type?: boolean
    status?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    amount?: boolean
    currency?: boolean
    gasUsed?: boolean
    blockNumber?: boolean
    description?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    txHash?: boolean
    type?: boolean
    status?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    amount?: boolean
    currency?: boolean
    gasUsed?: boolean
    blockNumber?: boolean
    description?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    txHash?: boolean
    type?: boolean
    status?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    amount?: boolean
    currency?: boolean
    gasUsed?: boolean
    blockNumber?: boolean
    description?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    agentId?: boolean
    txHash?: boolean
    type?: boolean
    status?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    amount?: boolean
    currency?: boolean
    gasUsed?: boolean
    blockNumber?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "txHash" | "type" | "status" | "fromAddress" | "toAddress" | "amount" | "currency" | "gasUsed" | "blockNumber" | "description" | "createdAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      txHash: string | null
      type: string
      status: string
      fromAddress: string | null
      toAddress: string | null
      amount: number | null
      currency: string | null
      gasUsed: number | null
      blockNumber: number | null
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly agentId: FieldRef<"Transaction", 'String'>
    readonly txHash: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'String'>
    readonly status: FieldRef<"Transaction", 'String'>
    readonly fromAddress: FieldRef<"Transaction", 'String'>
    readonly toAddress: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Float'>
    readonly currency: FieldRef<"Transaction", 'String'>
    readonly gasUsed: FieldRef<"Transaction", 'Float'>
    readonly blockNumber: FieldRef<"Transaction", 'Int'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    type: string | null
    message: string | null
    metadata: string | null
    createdAt: Date | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    type: string | null
    message: string | null
    metadata: string | null
    createdAt: Date | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    agentId: number
    type: number
    message: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type ActivityLogMinAggregateInputType = {
    id?: true
    agentId?: true
    type?: true
    message?: true
    metadata?: true
    createdAt?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    agentId?: true
    type?: true
    message?: true
    metadata?: true
    createdAt?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    agentId?: true
    type?: true
    message?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: string
    agentId: string
    type: string
    message: string
    metadata: string | null
    createdAt: Date
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    type?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    type?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    type?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    agentId?: boolean
    type?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type ActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "type" | "message" | "metadata" | "createdAt", ExtArgs["result"]["activityLog"]>
  export type ActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type ActivityLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type ActivityLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      type: string
      message: string
      metadata: string | null
      createdAt: Date
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs and returns the data updated in the database.
     * @param {ActivityLogUpdateManyAndReturnArgs} args - Arguments to update many ActivityLogs.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityLog model
   */
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'String'>
    readonly agentId: FieldRef<"ActivityLog", 'String'>
    readonly type: FieldRef<"ActivityLog", 'String'>
    readonly message: FieldRef<"ActivityLog", 'String'>
    readonly metadata: FieldRef<"ActivityLog", 'String'>
    readonly createdAt: FieldRef<"ActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog updateManyAndReturn
   */
  export type ActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
  }


  /**
   * Model AgentTask
   */

  export type AggregateAgentTask = {
    _count: AgentTaskCountAggregateOutputType | null
    _avg: AgentTaskAvgAggregateOutputType | null
    _sum: AgentTaskSumAggregateOutputType | null
    _min: AgentTaskMinAggregateOutputType | null
    _max: AgentTaskMaxAggregateOutputType | null
  }

  export type AgentTaskAvgAggregateOutputType = {
    targetValue: number | null
    baselinePrice: number | null
  }

  export type AgentTaskSumAggregateOutputType = {
    targetValue: number | null
    baselinePrice: number | null
  }

  export type AgentTaskMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    userId: string | null
    triggerType: string | null
    tokenSymbol: string | null
    conditionType: string | null
    targetValue: number | null
    baselinePrice: number | null
    executeAt: Date | null
    cronSchedule: string | null
    lastExecutedAt: Date | null
    actionType: string | null
    actionPayload: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentTaskMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    userId: string | null
    triggerType: string | null
    tokenSymbol: string | null
    conditionType: string | null
    targetValue: number | null
    baselinePrice: number | null
    executeAt: Date | null
    cronSchedule: string | null
    lastExecutedAt: Date | null
    actionType: string | null
    actionPayload: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentTaskCountAggregateOutputType = {
    id: number
    agentId: number
    userId: number
    triggerType: number
    tokenSymbol: number
    conditionType: number
    targetValue: number
    baselinePrice: number
    executeAt: number
    cronSchedule: number
    lastExecutedAt: number
    actionType: number
    actionPayload: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AgentTaskAvgAggregateInputType = {
    targetValue?: true
    baselinePrice?: true
  }

  export type AgentTaskSumAggregateInputType = {
    targetValue?: true
    baselinePrice?: true
  }

  export type AgentTaskMinAggregateInputType = {
    id?: true
    agentId?: true
    userId?: true
    triggerType?: true
    tokenSymbol?: true
    conditionType?: true
    targetValue?: true
    baselinePrice?: true
    executeAt?: true
    cronSchedule?: true
    lastExecutedAt?: true
    actionType?: true
    actionPayload?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentTaskMaxAggregateInputType = {
    id?: true
    agentId?: true
    userId?: true
    triggerType?: true
    tokenSymbol?: true
    conditionType?: true
    targetValue?: true
    baselinePrice?: true
    executeAt?: true
    cronSchedule?: true
    lastExecutedAt?: true
    actionType?: true
    actionPayload?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentTaskCountAggregateInputType = {
    id?: true
    agentId?: true
    userId?: true
    triggerType?: true
    tokenSymbol?: true
    conditionType?: true
    targetValue?: true
    baselinePrice?: true
    executeAt?: true
    cronSchedule?: true
    lastExecutedAt?: true
    actionType?: true
    actionPayload?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AgentTaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentTask to aggregate.
     */
    where?: AgentTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentTasks to fetch.
     */
    orderBy?: AgentTaskOrderByWithRelationInput | AgentTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentTasks
    **/
    _count?: true | AgentTaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentTaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentTaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentTaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentTaskMaxAggregateInputType
  }

  export type GetAgentTaskAggregateType<T extends AgentTaskAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentTask[P]>
      : GetScalarType<T[P], AggregateAgentTask[P]>
  }




  export type AgentTaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentTaskWhereInput
    orderBy?: AgentTaskOrderByWithAggregationInput | AgentTaskOrderByWithAggregationInput[]
    by: AgentTaskScalarFieldEnum[] | AgentTaskScalarFieldEnum
    having?: AgentTaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentTaskCountAggregateInputType | true
    _avg?: AgentTaskAvgAggregateInputType
    _sum?: AgentTaskSumAggregateInputType
    _min?: AgentTaskMinAggregateInputType
    _max?: AgentTaskMaxAggregateInputType
  }

  export type AgentTaskGroupByOutputType = {
    id: string
    agentId: string
    userId: string
    triggerType: string
    tokenSymbol: string | null
    conditionType: string | null
    targetValue: number | null
    baselinePrice: number | null
    executeAt: Date | null
    cronSchedule: string | null
    lastExecutedAt: Date | null
    actionType: string
    actionPayload: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: AgentTaskCountAggregateOutputType | null
    _avg: AgentTaskAvgAggregateOutputType | null
    _sum: AgentTaskSumAggregateOutputType | null
    _min: AgentTaskMinAggregateOutputType | null
    _max: AgentTaskMaxAggregateOutputType | null
  }

  type GetAgentTaskGroupByPayload<T extends AgentTaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentTaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentTaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentTaskGroupByOutputType[P]>
            : GetScalarType<T[P], AgentTaskGroupByOutputType[P]>
        }
      >
    >


  export type AgentTaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    userId?: boolean
    triggerType?: boolean
    tokenSymbol?: boolean
    conditionType?: boolean
    targetValue?: boolean
    baselinePrice?: boolean
    executeAt?: boolean
    cronSchedule?: boolean
    lastExecutedAt?: boolean
    actionType?: boolean
    actionPayload?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentTask"]>

  export type AgentTaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    userId?: boolean
    triggerType?: boolean
    tokenSymbol?: boolean
    conditionType?: boolean
    targetValue?: boolean
    baselinePrice?: boolean
    executeAt?: boolean
    cronSchedule?: boolean
    lastExecutedAt?: boolean
    actionType?: boolean
    actionPayload?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentTask"]>

  export type AgentTaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    userId?: boolean
    triggerType?: boolean
    tokenSymbol?: boolean
    conditionType?: boolean
    targetValue?: boolean
    baselinePrice?: boolean
    executeAt?: boolean
    cronSchedule?: boolean
    lastExecutedAt?: boolean
    actionType?: boolean
    actionPayload?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentTask"]>

  export type AgentTaskSelectScalar = {
    id?: boolean
    agentId?: boolean
    userId?: boolean
    triggerType?: boolean
    tokenSymbol?: boolean
    conditionType?: boolean
    targetValue?: boolean
    baselinePrice?: boolean
    executeAt?: boolean
    cronSchedule?: boolean
    lastExecutedAt?: boolean
    actionType?: boolean
    actionPayload?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AgentTaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "userId" | "triggerType" | "tokenSymbol" | "conditionType" | "targetValue" | "baselinePrice" | "executeAt" | "cronSchedule" | "lastExecutedAt" | "actionType" | "actionPayload" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["agentTask"]>
  export type AgentTaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AgentTaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AgentTaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AgentTaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentTask"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      userId: string
      triggerType: string
      tokenSymbol: string | null
      conditionType: string | null
      targetValue: number | null
      baselinePrice: number | null
      executeAt: Date | null
      cronSchedule: string | null
      lastExecutedAt: Date | null
      actionType: string
      actionPayload: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["agentTask"]>
    composites: {}
  }

  type AgentTaskGetPayload<S extends boolean | null | undefined | AgentTaskDefaultArgs> = $Result.GetResult<Prisma.$AgentTaskPayload, S>

  type AgentTaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentTaskCountAggregateInputType | true
    }

  export interface AgentTaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentTask'], meta: { name: 'AgentTask' } }
    /**
     * Find zero or one AgentTask that matches the filter.
     * @param {AgentTaskFindUniqueArgs} args - Arguments to find a AgentTask
     * @example
     * // Get one AgentTask
     * const agentTask = await prisma.agentTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentTaskFindUniqueArgs>(args: SelectSubset<T, AgentTaskFindUniqueArgs<ExtArgs>>): Prisma__AgentTaskClient<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgentTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentTaskFindUniqueOrThrowArgs} args - Arguments to find a AgentTask
     * @example
     * // Get one AgentTask
     * const agentTask = await prisma.agentTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentTaskFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentTaskClient<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentTaskFindFirstArgs} args - Arguments to find a AgentTask
     * @example
     * // Get one AgentTask
     * const agentTask = await prisma.agentTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentTaskFindFirstArgs>(args?: SelectSubset<T, AgentTaskFindFirstArgs<ExtArgs>>): Prisma__AgentTaskClient<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentTaskFindFirstOrThrowArgs} args - Arguments to find a AgentTask
     * @example
     * // Get one AgentTask
     * const agentTask = await prisma.agentTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentTaskFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentTaskClient<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentTasks
     * const agentTasks = await prisma.agentTask.findMany()
     * 
     * // Get first 10 AgentTasks
     * const agentTasks = await prisma.agentTask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentTaskWithIdOnly = await prisma.agentTask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentTaskFindManyArgs>(args?: SelectSubset<T, AgentTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgentTask.
     * @param {AgentTaskCreateArgs} args - Arguments to create a AgentTask.
     * @example
     * // Create one AgentTask
     * const AgentTask = await prisma.agentTask.create({
     *   data: {
     *     // ... data to create a AgentTask
     *   }
     * })
     * 
     */
    create<T extends AgentTaskCreateArgs>(args: SelectSubset<T, AgentTaskCreateArgs<ExtArgs>>): Prisma__AgentTaskClient<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgentTasks.
     * @param {AgentTaskCreateManyArgs} args - Arguments to create many AgentTasks.
     * @example
     * // Create many AgentTasks
     * const agentTask = await prisma.agentTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentTaskCreateManyArgs>(args?: SelectSubset<T, AgentTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentTasks and returns the data saved in the database.
     * @param {AgentTaskCreateManyAndReturnArgs} args - Arguments to create many AgentTasks.
     * @example
     * // Create many AgentTasks
     * const agentTask = await prisma.agentTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentTasks and only return the `id`
     * const agentTaskWithIdOnly = await prisma.agentTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentTaskCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AgentTask.
     * @param {AgentTaskDeleteArgs} args - Arguments to delete one AgentTask.
     * @example
     * // Delete one AgentTask
     * const AgentTask = await prisma.agentTask.delete({
     *   where: {
     *     // ... filter to delete one AgentTask
     *   }
     * })
     * 
     */
    delete<T extends AgentTaskDeleteArgs>(args: SelectSubset<T, AgentTaskDeleteArgs<ExtArgs>>): Prisma__AgentTaskClient<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgentTask.
     * @param {AgentTaskUpdateArgs} args - Arguments to update one AgentTask.
     * @example
     * // Update one AgentTask
     * const agentTask = await prisma.agentTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentTaskUpdateArgs>(args: SelectSubset<T, AgentTaskUpdateArgs<ExtArgs>>): Prisma__AgentTaskClient<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgentTasks.
     * @param {AgentTaskDeleteManyArgs} args - Arguments to filter AgentTasks to delete.
     * @example
     * // Delete a few AgentTasks
     * const { count } = await prisma.agentTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentTaskDeleteManyArgs>(args?: SelectSubset<T, AgentTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentTasks
     * const agentTask = await prisma.agentTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentTaskUpdateManyArgs>(args: SelectSubset<T, AgentTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentTasks and returns the data updated in the database.
     * @param {AgentTaskUpdateManyAndReturnArgs} args - Arguments to update many AgentTasks.
     * @example
     * // Update many AgentTasks
     * const agentTask = await prisma.agentTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgentTasks and only return the `id`
     * const agentTaskWithIdOnly = await prisma.agentTask.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentTaskUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AgentTask.
     * @param {AgentTaskUpsertArgs} args - Arguments to update or create a AgentTask.
     * @example
     * // Update or create a AgentTask
     * const agentTask = await prisma.agentTask.upsert({
     *   create: {
     *     // ... data to create a AgentTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentTask we want to update
     *   }
     * })
     */
    upsert<T extends AgentTaskUpsertArgs>(args: SelectSubset<T, AgentTaskUpsertArgs<ExtArgs>>): Prisma__AgentTaskClient<$Result.GetResult<Prisma.$AgentTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AgentTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentTaskCountArgs} args - Arguments to filter AgentTasks to count.
     * @example
     * // Count the number of AgentTasks
     * const count = await prisma.agentTask.count({
     *   where: {
     *     // ... the filter for the AgentTasks we want to count
     *   }
     * })
    **/
    count<T extends AgentTaskCountArgs>(
      args?: Subset<T, AgentTaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentTaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentTaskAggregateArgs>(args: Subset<T, AgentTaskAggregateArgs>): Prisma.PrismaPromise<GetAgentTaskAggregateType<T>>

    /**
     * Group by AgentTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentTaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentTaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentTaskGroupByArgs['orderBy'] }
        : { orderBy?: AgentTaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentTask model
   */
  readonly fields: AgentTaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentTask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentTaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentTask model
   */
  interface AgentTaskFieldRefs {
    readonly id: FieldRef<"AgentTask", 'String'>
    readonly agentId: FieldRef<"AgentTask", 'String'>
    readonly userId: FieldRef<"AgentTask", 'String'>
    readonly triggerType: FieldRef<"AgentTask", 'String'>
    readonly tokenSymbol: FieldRef<"AgentTask", 'String'>
    readonly conditionType: FieldRef<"AgentTask", 'String'>
    readonly targetValue: FieldRef<"AgentTask", 'Float'>
    readonly baselinePrice: FieldRef<"AgentTask", 'Float'>
    readonly executeAt: FieldRef<"AgentTask", 'DateTime'>
    readonly cronSchedule: FieldRef<"AgentTask", 'String'>
    readonly lastExecutedAt: FieldRef<"AgentTask", 'DateTime'>
    readonly actionType: FieldRef<"AgentTask", 'String'>
    readonly actionPayload: FieldRef<"AgentTask", 'String'>
    readonly status: FieldRef<"AgentTask", 'String'>
    readonly createdAt: FieldRef<"AgentTask", 'DateTime'>
    readonly updatedAt: FieldRef<"AgentTask", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentTask findUnique
   */
  export type AgentTaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskInclude<ExtArgs> | null
    /**
     * Filter, which AgentTask to fetch.
     */
    where: AgentTaskWhereUniqueInput
  }

  /**
   * AgentTask findUniqueOrThrow
   */
  export type AgentTaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskInclude<ExtArgs> | null
    /**
     * Filter, which AgentTask to fetch.
     */
    where: AgentTaskWhereUniqueInput
  }

  /**
   * AgentTask findFirst
   */
  export type AgentTaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskInclude<ExtArgs> | null
    /**
     * Filter, which AgentTask to fetch.
     */
    where?: AgentTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentTasks to fetch.
     */
    orderBy?: AgentTaskOrderByWithRelationInput | AgentTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentTasks.
     */
    cursor?: AgentTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentTasks.
     */
    distinct?: AgentTaskScalarFieldEnum | AgentTaskScalarFieldEnum[]
  }

  /**
   * AgentTask findFirstOrThrow
   */
  export type AgentTaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskInclude<ExtArgs> | null
    /**
     * Filter, which AgentTask to fetch.
     */
    where?: AgentTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentTasks to fetch.
     */
    orderBy?: AgentTaskOrderByWithRelationInput | AgentTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentTasks.
     */
    cursor?: AgentTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentTasks.
     */
    distinct?: AgentTaskScalarFieldEnum | AgentTaskScalarFieldEnum[]
  }

  /**
   * AgentTask findMany
   */
  export type AgentTaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskInclude<ExtArgs> | null
    /**
     * Filter, which AgentTasks to fetch.
     */
    where?: AgentTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentTasks to fetch.
     */
    orderBy?: AgentTaskOrderByWithRelationInput | AgentTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentTasks.
     */
    cursor?: AgentTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentTasks.
     */
    skip?: number
    distinct?: AgentTaskScalarFieldEnum | AgentTaskScalarFieldEnum[]
  }

  /**
   * AgentTask create
   */
  export type AgentTaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentTask.
     */
    data: XOR<AgentTaskCreateInput, AgentTaskUncheckedCreateInput>
  }

  /**
   * AgentTask createMany
   */
  export type AgentTaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentTasks.
     */
    data: AgentTaskCreateManyInput | AgentTaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentTask createManyAndReturn
   */
  export type AgentTaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * The data used to create many AgentTasks.
     */
    data: AgentTaskCreateManyInput | AgentTaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentTask update
   */
  export type AgentTaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentTask.
     */
    data: XOR<AgentTaskUpdateInput, AgentTaskUncheckedUpdateInput>
    /**
     * Choose, which AgentTask to update.
     */
    where: AgentTaskWhereUniqueInput
  }

  /**
   * AgentTask updateMany
   */
  export type AgentTaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentTasks.
     */
    data: XOR<AgentTaskUpdateManyMutationInput, AgentTaskUncheckedUpdateManyInput>
    /**
     * Filter which AgentTasks to update
     */
    where?: AgentTaskWhereInput
    /**
     * Limit how many AgentTasks to update.
     */
    limit?: number
  }

  /**
   * AgentTask updateManyAndReturn
   */
  export type AgentTaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * The data used to update AgentTasks.
     */
    data: XOR<AgentTaskUpdateManyMutationInput, AgentTaskUncheckedUpdateManyInput>
    /**
     * Filter which AgentTasks to update
     */
    where?: AgentTaskWhereInput
    /**
     * Limit how many AgentTasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentTask upsert
   */
  export type AgentTaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentTask to update in case it exists.
     */
    where: AgentTaskWhereUniqueInput
    /**
     * In case the AgentTask found by the `where` argument doesn't exist, create a new AgentTask with this data.
     */
    create: XOR<AgentTaskCreateInput, AgentTaskUncheckedCreateInput>
    /**
     * In case the AgentTask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentTaskUpdateInput, AgentTaskUncheckedUpdateInput>
  }

  /**
   * AgentTask delete
   */
  export type AgentTaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskInclude<ExtArgs> | null
    /**
     * Filter which AgentTask to delete.
     */
    where: AgentTaskWhereUniqueInput
  }

  /**
   * AgentTask deleteMany
   */
  export type AgentTaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentTasks to delete
     */
    where?: AgentTaskWhereInput
    /**
     * Limit how many AgentTasks to delete.
     */
    limit?: number
  }

  /**
   * AgentTask without action
   */
  export type AgentTaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentTask
     */
    select?: AgentTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentTask
     */
    omit?: AgentTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentTaskInclude<ExtArgs> | null
  }


  /**
   * Model EnsSubdomain
   */

  export type AggregateEnsSubdomain = {
    _count: EnsSubdomainCountAggregateOutputType | null
    _min: EnsSubdomainMinAggregateOutputType | null
    _max: EnsSubdomainMaxAggregateOutputType | null
  }

  export type EnsSubdomainMinAggregateOutputType = {
    id: string | null
    name: string | null
    fullName: string | null
    node: string | null
    ownerAddress: string | null
    isAgentOwned: boolean | null
    agentId: string | null
    registeredAt: Date | null
    updatedAt: Date | null
    txHash: string | null
  }

  export type EnsSubdomainMaxAggregateOutputType = {
    id: string | null
    name: string | null
    fullName: string | null
    node: string | null
    ownerAddress: string | null
    isAgentOwned: boolean | null
    agentId: string | null
    registeredAt: Date | null
    updatedAt: Date | null
    txHash: string | null
  }

  export type EnsSubdomainCountAggregateOutputType = {
    id: number
    name: number
    fullName: number
    node: number
    ownerAddress: number
    isAgentOwned: number
    agentId: number
    registeredAt: number
    updatedAt: number
    txHash: number
    _all: number
  }


  export type EnsSubdomainMinAggregateInputType = {
    id?: true
    name?: true
    fullName?: true
    node?: true
    ownerAddress?: true
    isAgentOwned?: true
    agentId?: true
    registeredAt?: true
    updatedAt?: true
    txHash?: true
  }

  export type EnsSubdomainMaxAggregateInputType = {
    id?: true
    name?: true
    fullName?: true
    node?: true
    ownerAddress?: true
    isAgentOwned?: true
    agentId?: true
    registeredAt?: true
    updatedAt?: true
    txHash?: true
  }

  export type EnsSubdomainCountAggregateInputType = {
    id?: true
    name?: true
    fullName?: true
    node?: true
    ownerAddress?: true
    isAgentOwned?: true
    agentId?: true
    registeredAt?: true
    updatedAt?: true
    txHash?: true
    _all?: true
  }

  export type EnsSubdomainAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EnsSubdomain to aggregate.
     */
    where?: EnsSubdomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnsSubdomains to fetch.
     */
    orderBy?: EnsSubdomainOrderByWithRelationInput | EnsSubdomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnsSubdomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnsSubdomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnsSubdomains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EnsSubdomains
    **/
    _count?: true | EnsSubdomainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnsSubdomainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnsSubdomainMaxAggregateInputType
  }

  export type GetEnsSubdomainAggregateType<T extends EnsSubdomainAggregateArgs> = {
        [P in keyof T & keyof AggregateEnsSubdomain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnsSubdomain[P]>
      : GetScalarType<T[P], AggregateEnsSubdomain[P]>
  }




  export type EnsSubdomainGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnsSubdomainWhereInput
    orderBy?: EnsSubdomainOrderByWithAggregationInput | EnsSubdomainOrderByWithAggregationInput[]
    by: EnsSubdomainScalarFieldEnum[] | EnsSubdomainScalarFieldEnum
    having?: EnsSubdomainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnsSubdomainCountAggregateInputType | true
    _min?: EnsSubdomainMinAggregateInputType
    _max?: EnsSubdomainMaxAggregateInputType
  }

  export type EnsSubdomainGroupByOutputType = {
    id: string
    name: string
    fullName: string
    node: string
    ownerAddress: string
    isAgentOwned: boolean
    agentId: string | null
    registeredAt: Date
    updatedAt: Date
    txHash: string | null
    _count: EnsSubdomainCountAggregateOutputType | null
    _min: EnsSubdomainMinAggregateOutputType | null
    _max: EnsSubdomainMaxAggregateOutputType | null
  }

  type GetEnsSubdomainGroupByPayload<T extends EnsSubdomainGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnsSubdomainGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnsSubdomainGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnsSubdomainGroupByOutputType[P]>
            : GetScalarType<T[P], EnsSubdomainGroupByOutputType[P]>
        }
      >
    >


  export type EnsSubdomainSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    fullName?: boolean
    node?: boolean
    ownerAddress?: boolean
    isAgentOwned?: boolean
    agentId?: boolean
    registeredAt?: boolean
    updatedAt?: boolean
    txHash?: boolean
    agent?: boolean | EnsSubdomain$agentArgs<ExtArgs>
  }, ExtArgs["result"]["ensSubdomain"]>

  export type EnsSubdomainSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    fullName?: boolean
    node?: boolean
    ownerAddress?: boolean
    isAgentOwned?: boolean
    agentId?: boolean
    registeredAt?: boolean
    updatedAt?: boolean
    txHash?: boolean
    agent?: boolean | EnsSubdomain$agentArgs<ExtArgs>
  }, ExtArgs["result"]["ensSubdomain"]>

  export type EnsSubdomainSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    fullName?: boolean
    node?: boolean
    ownerAddress?: boolean
    isAgentOwned?: boolean
    agentId?: boolean
    registeredAt?: boolean
    updatedAt?: boolean
    txHash?: boolean
    agent?: boolean | EnsSubdomain$agentArgs<ExtArgs>
  }, ExtArgs["result"]["ensSubdomain"]>

  export type EnsSubdomainSelectScalar = {
    id?: boolean
    name?: boolean
    fullName?: boolean
    node?: boolean
    ownerAddress?: boolean
    isAgentOwned?: boolean
    agentId?: boolean
    registeredAt?: boolean
    updatedAt?: boolean
    txHash?: boolean
  }

  export type EnsSubdomainOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "fullName" | "node" | "ownerAddress" | "isAgentOwned" | "agentId" | "registeredAt" | "updatedAt" | "txHash", ExtArgs["result"]["ensSubdomain"]>
  export type EnsSubdomainInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | EnsSubdomain$agentArgs<ExtArgs>
  }
  export type EnsSubdomainIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | EnsSubdomain$agentArgs<ExtArgs>
  }
  export type EnsSubdomainIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | EnsSubdomain$agentArgs<ExtArgs>
  }

  export type $EnsSubdomainPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EnsSubdomain"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      fullName: string
      node: string
      ownerAddress: string
      isAgentOwned: boolean
      agentId: string | null
      registeredAt: Date
      updatedAt: Date
      txHash: string | null
    }, ExtArgs["result"]["ensSubdomain"]>
    composites: {}
  }

  type EnsSubdomainGetPayload<S extends boolean | null | undefined | EnsSubdomainDefaultArgs> = $Result.GetResult<Prisma.$EnsSubdomainPayload, S>

  type EnsSubdomainCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnsSubdomainFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnsSubdomainCountAggregateInputType | true
    }

  export interface EnsSubdomainDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EnsSubdomain'], meta: { name: 'EnsSubdomain' } }
    /**
     * Find zero or one EnsSubdomain that matches the filter.
     * @param {EnsSubdomainFindUniqueArgs} args - Arguments to find a EnsSubdomain
     * @example
     * // Get one EnsSubdomain
     * const ensSubdomain = await prisma.ensSubdomain.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnsSubdomainFindUniqueArgs>(args: SelectSubset<T, EnsSubdomainFindUniqueArgs<ExtArgs>>): Prisma__EnsSubdomainClient<$Result.GetResult<Prisma.$EnsSubdomainPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EnsSubdomain that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnsSubdomainFindUniqueOrThrowArgs} args - Arguments to find a EnsSubdomain
     * @example
     * // Get one EnsSubdomain
     * const ensSubdomain = await prisma.ensSubdomain.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnsSubdomainFindUniqueOrThrowArgs>(args: SelectSubset<T, EnsSubdomainFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnsSubdomainClient<$Result.GetResult<Prisma.$EnsSubdomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EnsSubdomain that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnsSubdomainFindFirstArgs} args - Arguments to find a EnsSubdomain
     * @example
     * // Get one EnsSubdomain
     * const ensSubdomain = await prisma.ensSubdomain.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnsSubdomainFindFirstArgs>(args?: SelectSubset<T, EnsSubdomainFindFirstArgs<ExtArgs>>): Prisma__EnsSubdomainClient<$Result.GetResult<Prisma.$EnsSubdomainPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EnsSubdomain that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnsSubdomainFindFirstOrThrowArgs} args - Arguments to find a EnsSubdomain
     * @example
     * // Get one EnsSubdomain
     * const ensSubdomain = await prisma.ensSubdomain.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnsSubdomainFindFirstOrThrowArgs>(args?: SelectSubset<T, EnsSubdomainFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnsSubdomainClient<$Result.GetResult<Prisma.$EnsSubdomainPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EnsSubdomains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnsSubdomainFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EnsSubdomains
     * const ensSubdomains = await prisma.ensSubdomain.findMany()
     * 
     * // Get first 10 EnsSubdomains
     * const ensSubdomains = await prisma.ensSubdomain.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ensSubdomainWithIdOnly = await prisma.ensSubdomain.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnsSubdomainFindManyArgs>(args?: SelectSubset<T, EnsSubdomainFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnsSubdomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EnsSubdomain.
     * @param {EnsSubdomainCreateArgs} args - Arguments to create a EnsSubdomain.
     * @example
     * // Create one EnsSubdomain
     * const EnsSubdomain = await prisma.ensSubdomain.create({
     *   data: {
     *     // ... data to create a EnsSubdomain
     *   }
     * })
     * 
     */
    create<T extends EnsSubdomainCreateArgs>(args: SelectSubset<T, EnsSubdomainCreateArgs<ExtArgs>>): Prisma__EnsSubdomainClient<$Result.GetResult<Prisma.$EnsSubdomainPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EnsSubdomains.
     * @param {EnsSubdomainCreateManyArgs} args - Arguments to create many EnsSubdomains.
     * @example
     * // Create many EnsSubdomains
     * const ensSubdomain = await prisma.ensSubdomain.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnsSubdomainCreateManyArgs>(args?: SelectSubset<T, EnsSubdomainCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EnsSubdomains and returns the data saved in the database.
     * @param {EnsSubdomainCreateManyAndReturnArgs} args - Arguments to create many EnsSubdomains.
     * @example
     * // Create many EnsSubdomains
     * const ensSubdomain = await prisma.ensSubdomain.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EnsSubdomains and only return the `id`
     * const ensSubdomainWithIdOnly = await prisma.ensSubdomain.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnsSubdomainCreateManyAndReturnArgs>(args?: SelectSubset<T, EnsSubdomainCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnsSubdomainPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EnsSubdomain.
     * @param {EnsSubdomainDeleteArgs} args - Arguments to delete one EnsSubdomain.
     * @example
     * // Delete one EnsSubdomain
     * const EnsSubdomain = await prisma.ensSubdomain.delete({
     *   where: {
     *     // ... filter to delete one EnsSubdomain
     *   }
     * })
     * 
     */
    delete<T extends EnsSubdomainDeleteArgs>(args: SelectSubset<T, EnsSubdomainDeleteArgs<ExtArgs>>): Prisma__EnsSubdomainClient<$Result.GetResult<Prisma.$EnsSubdomainPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EnsSubdomain.
     * @param {EnsSubdomainUpdateArgs} args - Arguments to update one EnsSubdomain.
     * @example
     * // Update one EnsSubdomain
     * const ensSubdomain = await prisma.ensSubdomain.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnsSubdomainUpdateArgs>(args: SelectSubset<T, EnsSubdomainUpdateArgs<ExtArgs>>): Prisma__EnsSubdomainClient<$Result.GetResult<Prisma.$EnsSubdomainPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EnsSubdomains.
     * @param {EnsSubdomainDeleteManyArgs} args - Arguments to filter EnsSubdomains to delete.
     * @example
     * // Delete a few EnsSubdomains
     * const { count } = await prisma.ensSubdomain.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnsSubdomainDeleteManyArgs>(args?: SelectSubset<T, EnsSubdomainDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EnsSubdomains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnsSubdomainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EnsSubdomains
     * const ensSubdomain = await prisma.ensSubdomain.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnsSubdomainUpdateManyArgs>(args: SelectSubset<T, EnsSubdomainUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EnsSubdomains and returns the data updated in the database.
     * @param {EnsSubdomainUpdateManyAndReturnArgs} args - Arguments to update many EnsSubdomains.
     * @example
     * // Update many EnsSubdomains
     * const ensSubdomain = await prisma.ensSubdomain.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EnsSubdomains and only return the `id`
     * const ensSubdomainWithIdOnly = await prisma.ensSubdomain.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EnsSubdomainUpdateManyAndReturnArgs>(args: SelectSubset<T, EnsSubdomainUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnsSubdomainPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EnsSubdomain.
     * @param {EnsSubdomainUpsertArgs} args - Arguments to update or create a EnsSubdomain.
     * @example
     * // Update or create a EnsSubdomain
     * const ensSubdomain = await prisma.ensSubdomain.upsert({
     *   create: {
     *     // ... data to create a EnsSubdomain
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EnsSubdomain we want to update
     *   }
     * })
     */
    upsert<T extends EnsSubdomainUpsertArgs>(args: SelectSubset<T, EnsSubdomainUpsertArgs<ExtArgs>>): Prisma__EnsSubdomainClient<$Result.GetResult<Prisma.$EnsSubdomainPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EnsSubdomains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnsSubdomainCountArgs} args - Arguments to filter EnsSubdomains to count.
     * @example
     * // Count the number of EnsSubdomains
     * const count = await prisma.ensSubdomain.count({
     *   where: {
     *     // ... the filter for the EnsSubdomains we want to count
     *   }
     * })
    **/
    count<T extends EnsSubdomainCountArgs>(
      args?: Subset<T, EnsSubdomainCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnsSubdomainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EnsSubdomain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnsSubdomainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnsSubdomainAggregateArgs>(args: Subset<T, EnsSubdomainAggregateArgs>): Prisma.PrismaPromise<GetEnsSubdomainAggregateType<T>>

    /**
     * Group by EnsSubdomain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnsSubdomainGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnsSubdomainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnsSubdomainGroupByArgs['orderBy'] }
        : { orderBy?: EnsSubdomainGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnsSubdomainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnsSubdomainGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EnsSubdomain model
   */
  readonly fields: EnsSubdomainFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EnsSubdomain.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnsSubdomainClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends EnsSubdomain$agentArgs<ExtArgs> = {}>(args?: Subset<T, EnsSubdomain$agentArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EnsSubdomain model
   */
  interface EnsSubdomainFieldRefs {
    readonly id: FieldRef<"EnsSubdomain", 'String'>
    readonly name: FieldRef<"EnsSubdomain", 'String'>
    readonly fullName: FieldRef<"EnsSubdomain", 'String'>
    readonly node: FieldRef<"EnsSubdomain", 'String'>
    readonly ownerAddress: FieldRef<"EnsSubdomain", 'String'>
    readonly isAgentOwned: FieldRef<"EnsSubdomain", 'Boolean'>
    readonly agentId: FieldRef<"EnsSubdomain", 'String'>
    readonly registeredAt: FieldRef<"EnsSubdomain", 'DateTime'>
    readonly updatedAt: FieldRef<"EnsSubdomain", 'DateTime'>
    readonly txHash: FieldRef<"EnsSubdomain", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EnsSubdomain findUnique
   */
  export type EnsSubdomainFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainInclude<ExtArgs> | null
    /**
     * Filter, which EnsSubdomain to fetch.
     */
    where: EnsSubdomainWhereUniqueInput
  }

  /**
   * EnsSubdomain findUniqueOrThrow
   */
  export type EnsSubdomainFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainInclude<ExtArgs> | null
    /**
     * Filter, which EnsSubdomain to fetch.
     */
    where: EnsSubdomainWhereUniqueInput
  }

  /**
   * EnsSubdomain findFirst
   */
  export type EnsSubdomainFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainInclude<ExtArgs> | null
    /**
     * Filter, which EnsSubdomain to fetch.
     */
    where?: EnsSubdomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnsSubdomains to fetch.
     */
    orderBy?: EnsSubdomainOrderByWithRelationInput | EnsSubdomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EnsSubdomains.
     */
    cursor?: EnsSubdomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnsSubdomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnsSubdomains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnsSubdomains.
     */
    distinct?: EnsSubdomainScalarFieldEnum | EnsSubdomainScalarFieldEnum[]
  }

  /**
   * EnsSubdomain findFirstOrThrow
   */
  export type EnsSubdomainFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainInclude<ExtArgs> | null
    /**
     * Filter, which EnsSubdomain to fetch.
     */
    where?: EnsSubdomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnsSubdomains to fetch.
     */
    orderBy?: EnsSubdomainOrderByWithRelationInput | EnsSubdomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EnsSubdomains.
     */
    cursor?: EnsSubdomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnsSubdomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnsSubdomains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnsSubdomains.
     */
    distinct?: EnsSubdomainScalarFieldEnum | EnsSubdomainScalarFieldEnum[]
  }

  /**
   * EnsSubdomain findMany
   */
  export type EnsSubdomainFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainInclude<ExtArgs> | null
    /**
     * Filter, which EnsSubdomains to fetch.
     */
    where?: EnsSubdomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnsSubdomains to fetch.
     */
    orderBy?: EnsSubdomainOrderByWithRelationInput | EnsSubdomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EnsSubdomains.
     */
    cursor?: EnsSubdomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnsSubdomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnsSubdomains.
     */
    skip?: number
    distinct?: EnsSubdomainScalarFieldEnum | EnsSubdomainScalarFieldEnum[]
  }

  /**
   * EnsSubdomain create
   */
  export type EnsSubdomainCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainInclude<ExtArgs> | null
    /**
     * The data needed to create a EnsSubdomain.
     */
    data: XOR<EnsSubdomainCreateInput, EnsSubdomainUncheckedCreateInput>
  }

  /**
   * EnsSubdomain createMany
   */
  export type EnsSubdomainCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EnsSubdomains.
     */
    data: EnsSubdomainCreateManyInput | EnsSubdomainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EnsSubdomain createManyAndReturn
   */
  export type EnsSubdomainCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * The data used to create many EnsSubdomains.
     */
    data: EnsSubdomainCreateManyInput | EnsSubdomainCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EnsSubdomain update
   */
  export type EnsSubdomainUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainInclude<ExtArgs> | null
    /**
     * The data needed to update a EnsSubdomain.
     */
    data: XOR<EnsSubdomainUpdateInput, EnsSubdomainUncheckedUpdateInput>
    /**
     * Choose, which EnsSubdomain to update.
     */
    where: EnsSubdomainWhereUniqueInput
  }

  /**
   * EnsSubdomain updateMany
   */
  export type EnsSubdomainUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EnsSubdomains.
     */
    data: XOR<EnsSubdomainUpdateManyMutationInput, EnsSubdomainUncheckedUpdateManyInput>
    /**
     * Filter which EnsSubdomains to update
     */
    where?: EnsSubdomainWhereInput
    /**
     * Limit how many EnsSubdomains to update.
     */
    limit?: number
  }

  /**
   * EnsSubdomain updateManyAndReturn
   */
  export type EnsSubdomainUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * The data used to update EnsSubdomains.
     */
    data: XOR<EnsSubdomainUpdateManyMutationInput, EnsSubdomainUncheckedUpdateManyInput>
    /**
     * Filter which EnsSubdomains to update
     */
    where?: EnsSubdomainWhereInput
    /**
     * Limit how many EnsSubdomains to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EnsSubdomain upsert
   */
  export type EnsSubdomainUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainInclude<ExtArgs> | null
    /**
     * The filter to search for the EnsSubdomain to update in case it exists.
     */
    where: EnsSubdomainWhereUniqueInput
    /**
     * In case the EnsSubdomain found by the `where` argument doesn't exist, create a new EnsSubdomain with this data.
     */
    create: XOR<EnsSubdomainCreateInput, EnsSubdomainUncheckedCreateInput>
    /**
     * In case the EnsSubdomain was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnsSubdomainUpdateInput, EnsSubdomainUncheckedUpdateInput>
  }

  /**
   * EnsSubdomain delete
   */
  export type EnsSubdomainDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainInclude<ExtArgs> | null
    /**
     * Filter which EnsSubdomain to delete.
     */
    where: EnsSubdomainWhereUniqueInput
  }

  /**
   * EnsSubdomain deleteMany
   */
  export type EnsSubdomainDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EnsSubdomains to delete
     */
    where?: EnsSubdomainWhereInput
    /**
     * Limit how many EnsSubdomains to delete.
     */
    limit?: number
  }

  /**
   * EnsSubdomain.agent
   */
  export type EnsSubdomain$agentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    where?: AgentWhereInput
  }

  /**
   * EnsSubdomain without action
   */
  export type EnsSubdomainDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnsSubdomain
     */
    select?: EnsSubdomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnsSubdomain
     */
    omit?: EnsSubdomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnsSubdomainInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    walletAddress: 'walletAddress',
    walletDerivationIndex: 'walletDerivationIndex',
    openrouterApiKey: 'openrouterApiKey',
    openaiApiKey: 'openaiApiKey',
    groqApiKey: 'groqApiKey',
    grokApiKey: 'grokApiKey',
    geminiApiKey: 'geminiApiKey',
    deepseekApiKey: 'deepseekApiKey',
    zaiApiKey: 'zaiApiKey',
    anthropicApiKey: 'anthropicApiKey',
    telegramId: 'telegramId',
    telegramUsername: 'telegramUsername',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AgentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    templateType: 'templateType',
    status: 'status',
    systemPrompt: 'systemPrompt',
    llmProvider: 'llmProvider',
    llmModel: 'llmModel',
    spendingLimit: 'spendingLimit',
    spendingUsed: 'spendingUsed',
    agentWalletAddress: 'agentWalletAddress',
    walletDerivationIndex: 'walletDerivationIndex',
    walletType: 'walletType',
    sessionKeyAddress: 'sessionKeyAddress',
    sessionKeyPrivateKey: 'sessionKeyPrivateKey',
    sessionContext: 'sessionContext',
    sessionExpiresAt: 'sessionExpiresAt',
    sessionPermissions: 'sessionPermissions',
    telegramBotToken: 'telegramBotToken',
    telegramChatIds: 'telegramChatIds',
    discordBotToken: 'discordBotToken',
    webhookSecret: 'webhookSecret',
    disabledSkills: 'disabledSkills',
    externalSocials: 'externalSocials',
    channels: 'channels',
    cronJobs: 'cronJobs',
    pairingCode: 'pairingCode',
    pairingCodeExpiresAt: 'pairingCodeExpiresAt',
    openclawAgentId: 'openclawAgentId',
    imageUrl: 'imageUrl',
    imageSlug: 'imageSlug',
    imageDataBase64: 'imageDataBase64',
    erc8004AgentId: 'erc8004AgentId',
    erc8004URI: 'erc8004URI',
    erc8004TxHash: 'erc8004TxHash',
    erc8004ChainId: 'erc8004ChainId',
    reputationScore: 'reputationScore',
    exported: 'exported',
    exportedAt: 'exportedAt',
    configuration: 'configuration',
    ensSubdomain: 'ensSubdomain',
    ensNode: 'ensNode',
    ensRegisteredAt: 'ensRegisteredAt',
    agentDeployedTokens: 'agentDeployedTokens',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deployedAt: 'deployedAt'
  };

  export type AgentScalarFieldEnum = (typeof AgentScalarFieldEnum)[keyof typeof AgentScalarFieldEnum]


  export const ChannelBindingScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    userId: 'userId',
    channelType: 'channelType',
    senderIdentifier: 'senderIdentifier',
    senderName: 'senderName',
    chatIdentifier: 'chatIdentifier',
    pairingCode: 'pairingCode',
    bindingType: 'bindingType',
    isActive: 'isActive',
    pairedAt: 'pairedAt',
    lastMessageAt: 'lastMessageAt'
  };

  export type ChannelBindingScalarFieldEnum = (typeof ChannelBindingScalarFieldEnum)[keyof typeof ChannelBindingScalarFieldEnum]


  export const SessionMessageScalarFieldEnum: {
    id: 'id',
    bindingId: 'bindingId',
    role: 'role',
    content: 'content',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type SessionMessageScalarFieldEnum = (typeof SessionMessageScalarFieldEnum)[keyof typeof SessionMessageScalarFieldEnum]


  export const AgentVerificationScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    publicKey: 'publicKey',
    encryptedPrivateKey: 'encryptedPrivateKey',
    status: 'status',
    sessionId: 'sessionId',
    challenge: 'challenge',
    humanId: 'humanId',
    agentKeyHash: 'agentKeyHash',
    agentName: 'agentName',
    swarmUrl: 'swarmUrl',
    selfxyzVerified: 'selfxyzVerified',
    selfxyzRegisteredAt: 'selfxyzRegisteredAt',
    selfAppConfig: 'selfAppConfig',
    encryptedSelfclawApiKey: 'encryptedSelfclawApiKey',
    verifiedAt: 'verifiedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AgentVerificationScalarFieldEnum = (typeof AgentVerificationScalarFieldEnum)[keyof typeof AgentVerificationScalarFieldEnum]


  export const QRCodeScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    content: 'content',
    dataUrl: 'dataUrl',
    createdAt: 'createdAt'
  };

  export type QRCodeScalarFieldEnum = (typeof QRCodeScalarFieldEnum)[keyof typeof QRCodeScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    txHash: 'txHash',
    type: 'type',
    status: 'status',
    fromAddress: 'fromAddress',
    toAddress: 'toAddress',
    amount: 'amount',
    currency: 'currency',
    gasUsed: 'gasUsed',
    blockNumber: 'blockNumber',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    type: 'type',
    message: 'message',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const AgentTaskScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    userId: 'userId',
    triggerType: 'triggerType',
    tokenSymbol: 'tokenSymbol',
    conditionType: 'conditionType',
    targetValue: 'targetValue',
    baselinePrice: 'baselinePrice',
    executeAt: 'executeAt',
    cronSchedule: 'cronSchedule',
    lastExecutedAt: 'lastExecutedAt',
    actionType: 'actionType',
    actionPayload: 'actionPayload',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AgentTaskScalarFieldEnum = (typeof AgentTaskScalarFieldEnum)[keyof typeof AgentTaskScalarFieldEnum]


  export const EnsSubdomainScalarFieldEnum: {
    id: 'id',
    name: 'name',
    fullName: 'fullName',
    node: 'node',
    ownerAddress: 'ownerAddress',
    isAgentOwned: 'isAgentOwned',
    agentId: 'agentId',
    registeredAt: 'registeredAt',
    updatedAt: 'updatedAt',
    txHash: 'txHash'
  };

  export type EnsSubdomainScalarFieldEnum = (typeof EnsSubdomainScalarFieldEnum)[keyof typeof EnsSubdomainScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    walletAddress?: StringFilter<"User"> | string
    walletDerivationIndex?: IntNullableFilter<"User"> | number | null
    openrouterApiKey?: StringNullableFilter<"User"> | string | null
    openaiApiKey?: StringNullableFilter<"User"> | string | null
    groqApiKey?: StringNullableFilter<"User"> | string | null
    grokApiKey?: StringNullableFilter<"User"> | string | null
    geminiApiKey?: StringNullableFilter<"User"> | string | null
    deepseekApiKey?: StringNullableFilter<"User"> | string | null
    zaiApiKey?: StringNullableFilter<"User"> | string | null
    anthropicApiKey?: StringNullableFilter<"User"> | string | null
    telegramId?: StringNullableFilter<"User"> | string | null
    telegramUsername?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    agents?: AgentListRelationFilter
    agentTasks?: AgentTaskListRelationFilter
    channelBindings?: ChannelBindingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    walletAddress?: SortOrder
    walletDerivationIndex?: SortOrderInput | SortOrder
    openrouterApiKey?: SortOrderInput | SortOrder
    openaiApiKey?: SortOrderInput | SortOrder
    groqApiKey?: SortOrderInput | SortOrder
    grokApiKey?: SortOrderInput | SortOrder
    geminiApiKey?: SortOrderInput | SortOrder
    deepseekApiKey?: SortOrderInput | SortOrder
    zaiApiKey?: SortOrderInput | SortOrder
    anthropicApiKey?: SortOrderInput | SortOrder
    telegramId?: SortOrderInput | SortOrder
    telegramUsername?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agents?: AgentOrderByRelationAggregateInput
    agentTasks?: AgentTaskOrderByRelationAggregateInput
    channelBindings?: ChannelBindingOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    walletAddress?: string
    walletDerivationIndex?: number
    telegramId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    openrouterApiKey?: StringNullableFilter<"User"> | string | null
    openaiApiKey?: StringNullableFilter<"User"> | string | null
    groqApiKey?: StringNullableFilter<"User"> | string | null
    grokApiKey?: StringNullableFilter<"User"> | string | null
    geminiApiKey?: StringNullableFilter<"User"> | string | null
    deepseekApiKey?: StringNullableFilter<"User"> | string | null
    zaiApiKey?: StringNullableFilter<"User"> | string | null
    anthropicApiKey?: StringNullableFilter<"User"> | string | null
    telegramUsername?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    agents?: AgentListRelationFilter
    agentTasks?: AgentTaskListRelationFilter
    channelBindings?: ChannelBindingListRelationFilter
  }, "id" | "email" | "walletAddress" | "walletDerivationIndex" | "telegramId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    walletAddress?: SortOrder
    walletDerivationIndex?: SortOrderInput | SortOrder
    openrouterApiKey?: SortOrderInput | SortOrder
    openaiApiKey?: SortOrderInput | SortOrder
    groqApiKey?: SortOrderInput | SortOrder
    grokApiKey?: SortOrderInput | SortOrder
    geminiApiKey?: SortOrderInput | SortOrder
    deepseekApiKey?: SortOrderInput | SortOrder
    zaiApiKey?: SortOrderInput | SortOrder
    anthropicApiKey?: SortOrderInput | SortOrder
    telegramId?: SortOrderInput | SortOrder
    telegramUsername?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    walletAddress?: StringWithAggregatesFilter<"User"> | string
    walletDerivationIndex?: IntNullableWithAggregatesFilter<"User"> | number | null
    openrouterApiKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    openaiApiKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    groqApiKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    grokApiKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    geminiApiKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    deepseekApiKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    zaiApiKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    anthropicApiKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    telegramId?: StringNullableWithAggregatesFilter<"User"> | string | null
    telegramUsername?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AgentWhereInput = {
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    id?: StringFilter<"Agent"> | string
    name?: StringFilter<"Agent"> | string
    description?: StringNullableFilter<"Agent"> | string | null
    templateType?: StringFilter<"Agent"> | string
    status?: StringFilter<"Agent"> | string
    systemPrompt?: StringNullableFilter<"Agent"> | string | null
    llmProvider?: StringFilter<"Agent"> | string
    llmModel?: StringFilter<"Agent"> | string
    spendingLimit?: FloatFilter<"Agent"> | number
    spendingUsed?: FloatFilter<"Agent"> | number
    agentWalletAddress?: StringNullableFilter<"Agent"> | string | null
    walletDerivationIndex?: IntNullableFilter<"Agent"> | number | null
    walletType?: StringNullableFilter<"Agent"> | string | null
    sessionKeyAddress?: StringNullableFilter<"Agent"> | string | null
    sessionKeyPrivateKey?: StringNullableFilter<"Agent"> | string | null
    sessionContext?: StringNullableFilter<"Agent"> | string | null
    sessionExpiresAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    sessionPermissions?: StringNullableFilter<"Agent"> | string | null
    telegramBotToken?: StringNullableFilter<"Agent"> | string | null
    telegramChatIds?: StringNullableFilter<"Agent"> | string | null
    discordBotToken?: StringNullableFilter<"Agent"> | string | null
    webhookSecret?: StringNullableFilter<"Agent"> | string | null
    disabledSkills?: StringNullableFilter<"Agent"> | string | null
    externalSocials?: StringNullableFilter<"Agent"> | string | null
    channels?: StringNullableFilter<"Agent"> | string | null
    cronJobs?: StringNullableFilter<"Agent"> | string | null
    pairingCode?: StringNullableFilter<"Agent"> | string | null
    pairingCodeExpiresAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    openclawAgentId?: StringNullableFilter<"Agent"> | string | null
    imageUrl?: StringNullableFilter<"Agent"> | string | null
    imageSlug?: StringNullableFilter<"Agent"> | string | null
    imageDataBase64?: StringNullableFilter<"Agent"> | string | null
    erc8004AgentId?: StringNullableFilter<"Agent"> | string | null
    erc8004URI?: StringNullableFilter<"Agent"> | string | null
    erc8004TxHash?: StringNullableFilter<"Agent"> | string | null
    erc8004ChainId?: IntNullableFilter<"Agent"> | number | null
    reputationScore?: FloatFilter<"Agent"> | number
    exported?: BoolFilter<"Agent"> | boolean
    exportedAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    configuration?: StringNullableFilter<"Agent"> | string | null
    ensSubdomain?: StringNullableFilter<"Agent"> | string | null
    ensNode?: StringNullableFilter<"Agent"> | string | null
    ensRegisteredAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    agentDeployedTokens?: StringNullableFilter<"Agent"> | string | null
    ownerId?: StringFilter<"Agent"> | string
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    deployedAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
    channelBindings?: ChannelBindingListRelationFilter
    verification?: XOR<AgentVerificationNullableScalarRelationFilter, AgentVerificationWhereInput> | null
    agentTasks?: AgentTaskListRelationFilter
    ensRegistration?: XOR<EnsSubdomainNullableScalarRelationFilter, EnsSubdomainWhereInput> | null
  }

  export type AgentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    templateType?: SortOrder
    status?: SortOrder
    systemPrompt?: SortOrderInput | SortOrder
    llmProvider?: SortOrder
    llmModel?: SortOrder
    spendingLimit?: SortOrder
    spendingUsed?: SortOrder
    agentWalletAddress?: SortOrderInput | SortOrder
    walletDerivationIndex?: SortOrderInput | SortOrder
    walletType?: SortOrderInput | SortOrder
    sessionKeyAddress?: SortOrderInput | SortOrder
    sessionKeyPrivateKey?: SortOrderInput | SortOrder
    sessionContext?: SortOrderInput | SortOrder
    sessionExpiresAt?: SortOrderInput | SortOrder
    sessionPermissions?: SortOrderInput | SortOrder
    telegramBotToken?: SortOrderInput | SortOrder
    telegramChatIds?: SortOrderInput | SortOrder
    discordBotToken?: SortOrderInput | SortOrder
    webhookSecret?: SortOrderInput | SortOrder
    disabledSkills?: SortOrderInput | SortOrder
    externalSocials?: SortOrderInput | SortOrder
    channels?: SortOrderInput | SortOrder
    cronJobs?: SortOrderInput | SortOrder
    pairingCode?: SortOrderInput | SortOrder
    pairingCodeExpiresAt?: SortOrderInput | SortOrder
    openclawAgentId?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    imageSlug?: SortOrderInput | SortOrder
    imageDataBase64?: SortOrderInput | SortOrder
    erc8004AgentId?: SortOrderInput | SortOrder
    erc8004URI?: SortOrderInput | SortOrder
    erc8004TxHash?: SortOrderInput | SortOrder
    erc8004ChainId?: SortOrderInput | SortOrder
    reputationScore?: SortOrder
    exported?: SortOrder
    exportedAt?: SortOrderInput | SortOrder
    configuration?: SortOrderInput | SortOrder
    ensSubdomain?: SortOrderInput | SortOrder
    ensNode?: SortOrderInput | SortOrder
    ensRegisteredAt?: SortOrderInput | SortOrder
    agentDeployedTokens?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deployedAt?: SortOrderInput | SortOrder
    owner?: UserOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
    activityLogs?: ActivityLogOrderByRelationAggregateInput
    channelBindings?: ChannelBindingOrderByRelationAggregateInput
    verification?: AgentVerificationOrderByWithRelationInput
    agentTasks?: AgentTaskOrderByRelationAggregateInput
    ensRegistration?: EnsSubdomainOrderByWithRelationInput
  }

  export type AgentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    webhookSecret?: string
    pairingCode?: string
    ensSubdomain?: string
    ensNode?: string
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    name?: StringFilter<"Agent"> | string
    description?: StringNullableFilter<"Agent"> | string | null
    templateType?: StringFilter<"Agent"> | string
    status?: StringFilter<"Agent"> | string
    systemPrompt?: StringNullableFilter<"Agent"> | string | null
    llmProvider?: StringFilter<"Agent"> | string
    llmModel?: StringFilter<"Agent"> | string
    spendingLimit?: FloatFilter<"Agent"> | number
    spendingUsed?: FloatFilter<"Agent"> | number
    agentWalletAddress?: StringNullableFilter<"Agent"> | string | null
    walletDerivationIndex?: IntNullableFilter<"Agent"> | number | null
    walletType?: StringNullableFilter<"Agent"> | string | null
    sessionKeyAddress?: StringNullableFilter<"Agent"> | string | null
    sessionKeyPrivateKey?: StringNullableFilter<"Agent"> | string | null
    sessionContext?: StringNullableFilter<"Agent"> | string | null
    sessionExpiresAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    sessionPermissions?: StringNullableFilter<"Agent"> | string | null
    telegramBotToken?: StringNullableFilter<"Agent"> | string | null
    telegramChatIds?: StringNullableFilter<"Agent"> | string | null
    discordBotToken?: StringNullableFilter<"Agent"> | string | null
    disabledSkills?: StringNullableFilter<"Agent"> | string | null
    externalSocials?: StringNullableFilter<"Agent"> | string | null
    channels?: StringNullableFilter<"Agent"> | string | null
    cronJobs?: StringNullableFilter<"Agent"> | string | null
    pairingCodeExpiresAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    openclawAgentId?: StringNullableFilter<"Agent"> | string | null
    imageUrl?: StringNullableFilter<"Agent"> | string | null
    imageSlug?: StringNullableFilter<"Agent"> | string | null
    imageDataBase64?: StringNullableFilter<"Agent"> | string | null
    erc8004AgentId?: StringNullableFilter<"Agent"> | string | null
    erc8004URI?: StringNullableFilter<"Agent"> | string | null
    erc8004TxHash?: StringNullableFilter<"Agent"> | string | null
    erc8004ChainId?: IntNullableFilter<"Agent"> | number | null
    reputationScore?: FloatFilter<"Agent"> | number
    exported?: BoolFilter<"Agent"> | boolean
    exportedAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    configuration?: StringNullableFilter<"Agent"> | string | null
    ensRegisteredAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    agentDeployedTokens?: StringNullableFilter<"Agent"> | string | null
    ownerId?: StringFilter<"Agent"> | string
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    deployedAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
    channelBindings?: ChannelBindingListRelationFilter
    verification?: XOR<AgentVerificationNullableScalarRelationFilter, AgentVerificationWhereInput> | null
    agentTasks?: AgentTaskListRelationFilter
    ensRegistration?: XOR<EnsSubdomainNullableScalarRelationFilter, EnsSubdomainWhereInput> | null
  }, "id" | "webhookSecret" | "pairingCode" | "ensSubdomain" | "ensNode">

  export type AgentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    templateType?: SortOrder
    status?: SortOrder
    systemPrompt?: SortOrderInput | SortOrder
    llmProvider?: SortOrder
    llmModel?: SortOrder
    spendingLimit?: SortOrder
    spendingUsed?: SortOrder
    agentWalletAddress?: SortOrderInput | SortOrder
    walletDerivationIndex?: SortOrderInput | SortOrder
    walletType?: SortOrderInput | SortOrder
    sessionKeyAddress?: SortOrderInput | SortOrder
    sessionKeyPrivateKey?: SortOrderInput | SortOrder
    sessionContext?: SortOrderInput | SortOrder
    sessionExpiresAt?: SortOrderInput | SortOrder
    sessionPermissions?: SortOrderInput | SortOrder
    telegramBotToken?: SortOrderInput | SortOrder
    telegramChatIds?: SortOrderInput | SortOrder
    discordBotToken?: SortOrderInput | SortOrder
    webhookSecret?: SortOrderInput | SortOrder
    disabledSkills?: SortOrderInput | SortOrder
    externalSocials?: SortOrderInput | SortOrder
    channels?: SortOrderInput | SortOrder
    cronJobs?: SortOrderInput | SortOrder
    pairingCode?: SortOrderInput | SortOrder
    pairingCodeExpiresAt?: SortOrderInput | SortOrder
    openclawAgentId?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    imageSlug?: SortOrderInput | SortOrder
    imageDataBase64?: SortOrderInput | SortOrder
    erc8004AgentId?: SortOrderInput | SortOrder
    erc8004URI?: SortOrderInput | SortOrder
    erc8004TxHash?: SortOrderInput | SortOrder
    erc8004ChainId?: SortOrderInput | SortOrder
    reputationScore?: SortOrder
    exported?: SortOrder
    exportedAt?: SortOrderInput | SortOrder
    configuration?: SortOrderInput | SortOrder
    ensSubdomain?: SortOrderInput | SortOrder
    ensNode?: SortOrderInput | SortOrder
    ensRegisteredAt?: SortOrderInput | SortOrder
    agentDeployedTokens?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deployedAt?: SortOrderInput | SortOrder
    _count?: AgentCountOrderByAggregateInput
    _avg?: AgentAvgOrderByAggregateInput
    _max?: AgentMaxOrderByAggregateInput
    _min?: AgentMinOrderByAggregateInput
    _sum?: AgentSumOrderByAggregateInput
  }

  export type AgentScalarWhereWithAggregatesInput = {
    AND?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    OR?: AgentScalarWhereWithAggregatesInput[]
    NOT?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agent"> | string
    name?: StringWithAggregatesFilter<"Agent"> | string
    description?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    templateType?: StringWithAggregatesFilter<"Agent"> | string
    status?: StringWithAggregatesFilter<"Agent"> | string
    systemPrompt?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    llmProvider?: StringWithAggregatesFilter<"Agent"> | string
    llmModel?: StringWithAggregatesFilter<"Agent"> | string
    spendingLimit?: FloatWithAggregatesFilter<"Agent"> | number
    spendingUsed?: FloatWithAggregatesFilter<"Agent"> | number
    agentWalletAddress?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    walletDerivationIndex?: IntNullableWithAggregatesFilter<"Agent"> | number | null
    walletType?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    sessionKeyAddress?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    sessionKeyPrivateKey?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    sessionContext?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    sessionExpiresAt?: DateTimeNullableWithAggregatesFilter<"Agent"> | Date | string | null
    sessionPermissions?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    telegramBotToken?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    telegramChatIds?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    discordBotToken?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    webhookSecret?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    disabledSkills?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    externalSocials?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    channels?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    cronJobs?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    pairingCode?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    pairingCodeExpiresAt?: DateTimeNullableWithAggregatesFilter<"Agent"> | Date | string | null
    openclawAgentId?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    imageSlug?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    imageDataBase64?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    erc8004AgentId?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    erc8004URI?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    erc8004TxHash?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    erc8004ChainId?: IntNullableWithAggregatesFilter<"Agent"> | number | null
    reputationScore?: FloatWithAggregatesFilter<"Agent"> | number
    exported?: BoolWithAggregatesFilter<"Agent"> | boolean
    exportedAt?: DateTimeNullableWithAggregatesFilter<"Agent"> | Date | string | null
    configuration?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    ensSubdomain?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    ensNode?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    ensRegisteredAt?: DateTimeNullableWithAggregatesFilter<"Agent"> | Date | string | null
    agentDeployedTokens?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    ownerId?: StringWithAggregatesFilter<"Agent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
    deployedAt?: DateTimeNullableWithAggregatesFilter<"Agent"> | Date | string | null
  }

  export type ChannelBindingWhereInput = {
    AND?: ChannelBindingWhereInput | ChannelBindingWhereInput[]
    OR?: ChannelBindingWhereInput[]
    NOT?: ChannelBindingWhereInput | ChannelBindingWhereInput[]
    id?: StringFilter<"ChannelBinding"> | string
    agentId?: StringFilter<"ChannelBinding"> | string
    userId?: StringNullableFilter<"ChannelBinding"> | string | null
    channelType?: StringFilter<"ChannelBinding"> | string
    senderIdentifier?: StringFilter<"ChannelBinding"> | string
    senderName?: StringNullableFilter<"ChannelBinding"> | string | null
    chatIdentifier?: StringNullableFilter<"ChannelBinding"> | string | null
    pairingCode?: StringNullableFilter<"ChannelBinding"> | string | null
    bindingType?: StringFilter<"ChannelBinding"> | string
    isActive?: BoolFilter<"ChannelBinding"> | boolean
    pairedAt?: DateTimeFilter<"ChannelBinding"> | Date | string
    lastMessageAt?: DateTimeFilter<"ChannelBinding"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    sessionMessages?: SessionMessageListRelationFilter
  }

  export type ChannelBindingOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrderInput | SortOrder
    channelType?: SortOrder
    senderIdentifier?: SortOrder
    senderName?: SortOrderInput | SortOrder
    chatIdentifier?: SortOrderInput | SortOrder
    pairingCode?: SortOrderInput | SortOrder
    bindingType?: SortOrder
    isActive?: SortOrder
    pairedAt?: SortOrder
    lastMessageAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    sessionMessages?: SessionMessageOrderByRelationAggregateInput
  }

  export type ChannelBindingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChannelBindingWhereInput | ChannelBindingWhereInput[]
    OR?: ChannelBindingWhereInput[]
    NOT?: ChannelBindingWhereInput | ChannelBindingWhereInput[]
    agentId?: StringFilter<"ChannelBinding"> | string
    userId?: StringNullableFilter<"ChannelBinding"> | string | null
    channelType?: StringFilter<"ChannelBinding"> | string
    senderIdentifier?: StringFilter<"ChannelBinding"> | string
    senderName?: StringNullableFilter<"ChannelBinding"> | string | null
    chatIdentifier?: StringNullableFilter<"ChannelBinding"> | string | null
    pairingCode?: StringNullableFilter<"ChannelBinding"> | string | null
    bindingType?: StringFilter<"ChannelBinding"> | string
    isActive?: BoolFilter<"ChannelBinding"> | boolean
    pairedAt?: DateTimeFilter<"ChannelBinding"> | Date | string
    lastMessageAt?: DateTimeFilter<"ChannelBinding"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    sessionMessages?: SessionMessageListRelationFilter
  }, "id">

  export type ChannelBindingOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrderInput | SortOrder
    channelType?: SortOrder
    senderIdentifier?: SortOrder
    senderName?: SortOrderInput | SortOrder
    chatIdentifier?: SortOrderInput | SortOrder
    pairingCode?: SortOrderInput | SortOrder
    bindingType?: SortOrder
    isActive?: SortOrder
    pairedAt?: SortOrder
    lastMessageAt?: SortOrder
    _count?: ChannelBindingCountOrderByAggregateInput
    _max?: ChannelBindingMaxOrderByAggregateInput
    _min?: ChannelBindingMinOrderByAggregateInput
  }

  export type ChannelBindingScalarWhereWithAggregatesInput = {
    AND?: ChannelBindingScalarWhereWithAggregatesInput | ChannelBindingScalarWhereWithAggregatesInput[]
    OR?: ChannelBindingScalarWhereWithAggregatesInput[]
    NOT?: ChannelBindingScalarWhereWithAggregatesInput | ChannelBindingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChannelBinding"> | string
    agentId?: StringWithAggregatesFilter<"ChannelBinding"> | string
    userId?: StringNullableWithAggregatesFilter<"ChannelBinding"> | string | null
    channelType?: StringWithAggregatesFilter<"ChannelBinding"> | string
    senderIdentifier?: StringWithAggregatesFilter<"ChannelBinding"> | string
    senderName?: StringNullableWithAggregatesFilter<"ChannelBinding"> | string | null
    chatIdentifier?: StringNullableWithAggregatesFilter<"ChannelBinding"> | string | null
    pairingCode?: StringNullableWithAggregatesFilter<"ChannelBinding"> | string | null
    bindingType?: StringWithAggregatesFilter<"ChannelBinding"> | string
    isActive?: BoolWithAggregatesFilter<"ChannelBinding"> | boolean
    pairedAt?: DateTimeWithAggregatesFilter<"ChannelBinding"> | Date | string
    lastMessageAt?: DateTimeWithAggregatesFilter<"ChannelBinding"> | Date | string
  }

  export type SessionMessageWhereInput = {
    AND?: SessionMessageWhereInput | SessionMessageWhereInput[]
    OR?: SessionMessageWhereInput[]
    NOT?: SessionMessageWhereInput | SessionMessageWhereInput[]
    id?: StringFilter<"SessionMessage"> | string
    bindingId?: StringFilter<"SessionMessage"> | string
    role?: StringFilter<"SessionMessage"> | string
    content?: StringFilter<"SessionMessage"> | string
    metadata?: StringNullableFilter<"SessionMessage"> | string | null
    createdAt?: DateTimeFilter<"SessionMessage"> | Date | string
    binding?: XOR<ChannelBindingScalarRelationFilter, ChannelBindingWhereInput>
  }

  export type SessionMessageOrderByWithRelationInput = {
    id?: SortOrder
    bindingId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    binding?: ChannelBindingOrderByWithRelationInput
  }

  export type SessionMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionMessageWhereInput | SessionMessageWhereInput[]
    OR?: SessionMessageWhereInput[]
    NOT?: SessionMessageWhereInput | SessionMessageWhereInput[]
    bindingId?: StringFilter<"SessionMessage"> | string
    role?: StringFilter<"SessionMessage"> | string
    content?: StringFilter<"SessionMessage"> | string
    metadata?: StringNullableFilter<"SessionMessage"> | string | null
    createdAt?: DateTimeFilter<"SessionMessage"> | Date | string
    binding?: XOR<ChannelBindingScalarRelationFilter, ChannelBindingWhereInput>
  }, "id">

  export type SessionMessageOrderByWithAggregationInput = {
    id?: SortOrder
    bindingId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SessionMessageCountOrderByAggregateInput
    _max?: SessionMessageMaxOrderByAggregateInput
    _min?: SessionMessageMinOrderByAggregateInput
  }

  export type SessionMessageScalarWhereWithAggregatesInput = {
    AND?: SessionMessageScalarWhereWithAggregatesInput | SessionMessageScalarWhereWithAggregatesInput[]
    OR?: SessionMessageScalarWhereWithAggregatesInput[]
    NOT?: SessionMessageScalarWhereWithAggregatesInput | SessionMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SessionMessage"> | string
    bindingId?: StringWithAggregatesFilter<"SessionMessage"> | string
    role?: StringWithAggregatesFilter<"SessionMessage"> | string
    content?: StringWithAggregatesFilter<"SessionMessage"> | string
    metadata?: StringNullableWithAggregatesFilter<"SessionMessage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SessionMessage"> | Date | string
  }

  export type AgentVerificationWhereInput = {
    AND?: AgentVerificationWhereInput | AgentVerificationWhereInput[]
    OR?: AgentVerificationWhereInput[]
    NOT?: AgentVerificationWhereInput | AgentVerificationWhereInput[]
    id?: StringFilter<"AgentVerification"> | string
    agentId?: StringFilter<"AgentVerification"> | string
    publicKey?: StringFilter<"AgentVerification"> | string
    encryptedPrivateKey?: StringFilter<"AgentVerification"> | string
    status?: StringFilter<"AgentVerification"> | string
    sessionId?: StringNullableFilter<"AgentVerification"> | string | null
    challenge?: StringNullableFilter<"AgentVerification"> | string | null
    humanId?: StringNullableFilter<"AgentVerification"> | string | null
    agentKeyHash?: StringNullableFilter<"AgentVerification"> | string | null
    agentName?: StringNullableFilter<"AgentVerification"> | string | null
    swarmUrl?: StringNullableFilter<"AgentVerification"> | string | null
    selfxyzVerified?: BoolFilter<"AgentVerification"> | boolean
    selfxyzRegisteredAt?: DateTimeNullableFilter<"AgentVerification"> | Date | string | null
    selfAppConfig?: StringNullableFilter<"AgentVerification"> | string | null
    encryptedSelfclawApiKey?: StringNullableFilter<"AgentVerification"> | string | null
    verifiedAt?: DateTimeNullableFilter<"AgentVerification"> | Date | string | null
    createdAt?: DateTimeFilter<"AgentVerification"> | Date | string
    updatedAt?: DateTimeFilter<"AgentVerification"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }

  export type AgentVerificationOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    publicKey?: SortOrder
    encryptedPrivateKey?: SortOrder
    status?: SortOrder
    sessionId?: SortOrderInput | SortOrder
    challenge?: SortOrderInput | SortOrder
    humanId?: SortOrderInput | SortOrder
    agentKeyHash?: SortOrderInput | SortOrder
    agentName?: SortOrderInput | SortOrder
    swarmUrl?: SortOrderInput | SortOrder
    selfxyzVerified?: SortOrder
    selfxyzRegisteredAt?: SortOrderInput | SortOrder
    selfAppConfig?: SortOrderInput | SortOrder
    encryptedSelfclawApiKey?: SortOrderInput | SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type AgentVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    agentId?: string
    AND?: AgentVerificationWhereInput | AgentVerificationWhereInput[]
    OR?: AgentVerificationWhereInput[]
    NOT?: AgentVerificationWhereInput | AgentVerificationWhereInput[]
    publicKey?: StringFilter<"AgentVerification"> | string
    encryptedPrivateKey?: StringFilter<"AgentVerification"> | string
    status?: StringFilter<"AgentVerification"> | string
    sessionId?: StringNullableFilter<"AgentVerification"> | string | null
    challenge?: StringNullableFilter<"AgentVerification"> | string | null
    humanId?: StringNullableFilter<"AgentVerification"> | string | null
    agentKeyHash?: StringNullableFilter<"AgentVerification"> | string | null
    agentName?: StringNullableFilter<"AgentVerification"> | string | null
    swarmUrl?: StringNullableFilter<"AgentVerification"> | string | null
    selfxyzVerified?: BoolFilter<"AgentVerification"> | boolean
    selfxyzRegisteredAt?: DateTimeNullableFilter<"AgentVerification"> | Date | string | null
    selfAppConfig?: StringNullableFilter<"AgentVerification"> | string | null
    encryptedSelfclawApiKey?: StringNullableFilter<"AgentVerification"> | string | null
    verifiedAt?: DateTimeNullableFilter<"AgentVerification"> | Date | string | null
    createdAt?: DateTimeFilter<"AgentVerification"> | Date | string
    updatedAt?: DateTimeFilter<"AgentVerification"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }, "id" | "agentId">

  export type AgentVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    publicKey?: SortOrder
    encryptedPrivateKey?: SortOrder
    status?: SortOrder
    sessionId?: SortOrderInput | SortOrder
    challenge?: SortOrderInput | SortOrder
    humanId?: SortOrderInput | SortOrder
    agentKeyHash?: SortOrderInput | SortOrder
    agentName?: SortOrderInput | SortOrder
    swarmUrl?: SortOrderInput | SortOrder
    selfxyzVerified?: SortOrder
    selfxyzRegisteredAt?: SortOrderInput | SortOrder
    selfAppConfig?: SortOrderInput | SortOrder
    encryptedSelfclawApiKey?: SortOrderInput | SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AgentVerificationCountOrderByAggregateInput
    _max?: AgentVerificationMaxOrderByAggregateInput
    _min?: AgentVerificationMinOrderByAggregateInput
  }

  export type AgentVerificationScalarWhereWithAggregatesInput = {
    AND?: AgentVerificationScalarWhereWithAggregatesInput | AgentVerificationScalarWhereWithAggregatesInput[]
    OR?: AgentVerificationScalarWhereWithAggregatesInput[]
    NOT?: AgentVerificationScalarWhereWithAggregatesInput | AgentVerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentVerification"> | string
    agentId?: StringWithAggregatesFilter<"AgentVerification"> | string
    publicKey?: StringWithAggregatesFilter<"AgentVerification"> | string
    encryptedPrivateKey?: StringWithAggregatesFilter<"AgentVerification"> | string
    status?: StringWithAggregatesFilter<"AgentVerification"> | string
    sessionId?: StringNullableWithAggregatesFilter<"AgentVerification"> | string | null
    challenge?: StringNullableWithAggregatesFilter<"AgentVerification"> | string | null
    humanId?: StringNullableWithAggregatesFilter<"AgentVerification"> | string | null
    agentKeyHash?: StringNullableWithAggregatesFilter<"AgentVerification"> | string | null
    agentName?: StringNullableWithAggregatesFilter<"AgentVerification"> | string | null
    swarmUrl?: StringNullableWithAggregatesFilter<"AgentVerification"> | string | null
    selfxyzVerified?: BoolWithAggregatesFilter<"AgentVerification"> | boolean
    selfxyzRegisteredAt?: DateTimeNullableWithAggregatesFilter<"AgentVerification"> | Date | string | null
    selfAppConfig?: StringNullableWithAggregatesFilter<"AgentVerification"> | string | null
    encryptedSelfclawApiKey?: StringNullableWithAggregatesFilter<"AgentVerification"> | string | null
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"AgentVerification"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AgentVerification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AgentVerification"> | Date | string
  }

  export type QRCodeWhereInput = {
    AND?: QRCodeWhereInput | QRCodeWhereInput[]
    OR?: QRCodeWhereInput[]
    NOT?: QRCodeWhereInput | QRCodeWhereInput[]
    id?: StringFilter<"QRCode"> | string
    agentId?: StringNullableFilter<"QRCode"> | string | null
    content?: StringFilter<"QRCode"> | string
    dataUrl?: StringFilter<"QRCode"> | string
    createdAt?: DateTimeFilter<"QRCode"> | Date | string
  }

  export type QRCodeOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrderInput | SortOrder
    content?: SortOrder
    dataUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type QRCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QRCodeWhereInput | QRCodeWhereInput[]
    OR?: QRCodeWhereInput[]
    NOT?: QRCodeWhereInput | QRCodeWhereInput[]
    agentId?: StringNullableFilter<"QRCode"> | string | null
    content?: StringFilter<"QRCode"> | string
    dataUrl?: StringFilter<"QRCode"> | string
    createdAt?: DateTimeFilter<"QRCode"> | Date | string
  }, "id">

  export type QRCodeOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrderInput | SortOrder
    content?: SortOrder
    dataUrl?: SortOrder
    createdAt?: SortOrder
    _count?: QRCodeCountOrderByAggregateInput
    _max?: QRCodeMaxOrderByAggregateInput
    _min?: QRCodeMinOrderByAggregateInput
  }

  export type QRCodeScalarWhereWithAggregatesInput = {
    AND?: QRCodeScalarWhereWithAggregatesInput | QRCodeScalarWhereWithAggregatesInput[]
    OR?: QRCodeScalarWhereWithAggregatesInput[]
    NOT?: QRCodeScalarWhereWithAggregatesInput | QRCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QRCode"> | string
    agentId?: StringNullableWithAggregatesFilter<"QRCode"> | string | null
    content?: StringWithAggregatesFilter<"QRCode"> | string
    dataUrl?: StringWithAggregatesFilter<"QRCode"> | string
    createdAt?: DateTimeWithAggregatesFilter<"QRCode"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    agentId?: StringFilter<"Transaction"> | string
    txHash?: StringNullableFilter<"Transaction"> | string | null
    type?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    fromAddress?: StringNullableFilter<"Transaction"> | string | null
    toAddress?: StringNullableFilter<"Transaction"> | string | null
    amount?: FloatNullableFilter<"Transaction"> | number | null
    currency?: StringNullableFilter<"Transaction"> | string | null
    gasUsed?: FloatNullableFilter<"Transaction"> | number | null
    blockNumber?: IntNullableFilter<"Transaction"> | number | null
    description?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    txHash?: SortOrderInput | SortOrder
    type?: SortOrder
    status?: SortOrder
    fromAddress?: SortOrderInput | SortOrder
    toAddress?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    currency?: SortOrderInput | SortOrder
    gasUsed?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    agentId?: StringFilter<"Transaction"> | string
    txHash?: StringNullableFilter<"Transaction"> | string | null
    type?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    fromAddress?: StringNullableFilter<"Transaction"> | string | null
    toAddress?: StringNullableFilter<"Transaction"> | string | null
    amount?: FloatNullableFilter<"Transaction"> | number | null
    currency?: StringNullableFilter<"Transaction"> | string | null
    gasUsed?: FloatNullableFilter<"Transaction"> | number | null
    blockNumber?: IntNullableFilter<"Transaction"> | number | null
    description?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    txHash?: SortOrderInput | SortOrder
    type?: SortOrder
    status?: SortOrder
    fromAddress?: SortOrderInput | SortOrder
    toAddress?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    currency?: SortOrderInput | SortOrder
    gasUsed?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    agentId?: StringWithAggregatesFilter<"Transaction"> | string
    txHash?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    type?: StringWithAggregatesFilter<"Transaction"> | string
    status?: StringWithAggregatesFilter<"Transaction"> | string
    fromAddress?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    toAddress?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    amount?: FloatNullableWithAggregatesFilter<"Transaction"> | number | null
    currency?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    gasUsed?: FloatNullableWithAggregatesFilter<"Transaction"> | number | null
    blockNumber?: IntNullableWithAggregatesFilter<"Transaction"> | number | null
    description?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    agentId?: StringFilter<"ActivityLog"> | string
    type?: StringFilter<"ActivityLog"> | string
    message?: StringFilter<"ActivityLog"> | string
    metadata?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    agentId?: StringFilter<"ActivityLog"> | string
    type?: StringFilter<"ActivityLog"> | string
    message?: StringFilter<"ActivityLog"> | string
    metadata?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityLog"> | string
    agentId?: StringWithAggregatesFilter<"ActivityLog"> | string
    type?: StringWithAggregatesFilter<"ActivityLog"> | string
    message?: StringWithAggregatesFilter<"ActivityLog"> | string
    metadata?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
  }

  export type AgentTaskWhereInput = {
    AND?: AgentTaskWhereInput | AgentTaskWhereInput[]
    OR?: AgentTaskWhereInput[]
    NOT?: AgentTaskWhereInput | AgentTaskWhereInput[]
    id?: StringFilter<"AgentTask"> | string
    agentId?: StringFilter<"AgentTask"> | string
    userId?: StringFilter<"AgentTask"> | string
    triggerType?: StringFilter<"AgentTask"> | string
    tokenSymbol?: StringNullableFilter<"AgentTask"> | string | null
    conditionType?: StringNullableFilter<"AgentTask"> | string | null
    targetValue?: FloatNullableFilter<"AgentTask"> | number | null
    baselinePrice?: FloatNullableFilter<"AgentTask"> | number | null
    executeAt?: DateTimeNullableFilter<"AgentTask"> | Date | string | null
    cronSchedule?: StringNullableFilter<"AgentTask"> | string | null
    lastExecutedAt?: DateTimeNullableFilter<"AgentTask"> | Date | string | null
    actionType?: StringFilter<"AgentTask"> | string
    actionPayload?: StringFilter<"AgentTask"> | string
    status?: StringFilter<"AgentTask"> | string
    createdAt?: DateTimeFilter<"AgentTask"> | Date | string
    updatedAt?: DateTimeFilter<"AgentTask"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AgentTaskOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    triggerType?: SortOrder
    tokenSymbol?: SortOrderInput | SortOrder
    conditionType?: SortOrderInput | SortOrder
    targetValue?: SortOrderInput | SortOrder
    baselinePrice?: SortOrderInput | SortOrder
    executeAt?: SortOrderInput | SortOrder
    cronSchedule?: SortOrderInput | SortOrder
    lastExecutedAt?: SortOrderInput | SortOrder
    actionType?: SortOrder
    actionPayload?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type AgentTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentTaskWhereInput | AgentTaskWhereInput[]
    OR?: AgentTaskWhereInput[]
    NOT?: AgentTaskWhereInput | AgentTaskWhereInput[]
    agentId?: StringFilter<"AgentTask"> | string
    userId?: StringFilter<"AgentTask"> | string
    triggerType?: StringFilter<"AgentTask"> | string
    tokenSymbol?: StringNullableFilter<"AgentTask"> | string | null
    conditionType?: StringNullableFilter<"AgentTask"> | string | null
    targetValue?: FloatNullableFilter<"AgentTask"> | number | null
    baselinePrice?: FloatNullableFilter<"AgentTask"> | number | null
    executeAt?: DateTimeNullableFilter<"AgentTask"> | Date | string | null
    cronSchedule?: StringNullableFilter<"AgentTask"> | string | null
    lastExecutedAt?: DateTimeNullableFilter<"AgentTask"> | Date | string | null
    actionType?: StringFilter<"AgentTask"> | string
    actionPayload?: StringFilter<"AgentTask"> | string
    status?: StringFilter<"AgentTask"> | string
    createdAt?: DateTimeFilter<"AgentTask"> | Date | string
    updatedAt?: DateTimeFilter<"AgentTask"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AgentTaskOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    triggerType?: SortOrder
    tokenSymbol?: SortOrderInput | SortOrder
    conditionType?: SortOrderInput | SortOrder
    targetValue?: SortOrderInput | SortOrder
    baselinePrice?: SortOrderInput | SortOrder
    executeAt?: SortOrderInput | SortOrder
    cronSchedule?: SortOrderInput | SortOrder
    lastExecutedAt?: SortOrderInput | SortOrder
    actionType?: SortOrder
    actionPayload?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AgentTaskCountOrderByAggregateInput
    _avg?: AgentTaskAvgOrderByAggregateInput
    _max?: AgentTaskMaxOrderByAggregateInput
    _min?: AgentTaskMinOrderByAggregateInput
    _sum?: AgentTaskSumOrderByAggregateInput
  }

  export type AgentTaskScalarWhereWithAggregatesInput = {
    AND?: AgentTaskScalarWhereWithAggregatesInput | AgentTaskScalarWhereWithAggregatesInput[]
    OR?: AgentTaskScalarWhereWithAggregatesInput[]
    NOT?: AgentTaskScalarWhereWithAggregatesInput | AgentTaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentTask"> | string
    agentId?: StringWithAggregatesFilter<"AgentTask"> | string
    userId?: StringWithAggregatesFilter<"AgentTask"> | string
    triggerType?: StringWithAggregatesFilter<"AgentTask"> | string
    tokenSymbol?: StringNullableWithAggregatesFilter<"AgentTask"> | string | null
    conditionType?: StringNullableWithAggregatesFilter<"AgentTask"> | string | null
    targetValue?: FloatNullableWithAggregatesFilter<"AgentTask"> | number | null
    baselinePrice?: FloatNullableWithAggregatesFilter<"AgentTask"> | number | null
    executeAt?: DateTimeNullableWithAggregatesFilter<"AgentTask"> | Date | string | null
    cronSchedule?: StringNullableWithAggregatesFilter<"AgentTask"> | string | null
    lastExecutedAt?: DateTimeNullableWithAggregatesFilter<"AgentTask"> | Date | string | null
    actionType?: StringWithAggregatesFilter<"AgentTask"> | string
    actionPayload?: StringWithAggregatesFilter<"AgentTask"> | string
    status?: StringWithAggregatesFilter<"AgentTask"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AgentTask"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AgentTask"> | Date | string
  }

  export type EnsSubdomainWhereInput = {
    AND?: EnsSubdomainWhereInput | EnsSubdomainWhereInput[]
    OR?: EnsSubdomainWhereInput[]
    NOT?: EnsSubdomainWhereInput | EnsSubdomainWhereInput[]
    id?: StringFilter<"EnsSubdomain"> | string
    name?: StringFilter<"EnsSubdomain"> | string
    fullName?: StringFilter<"EnsSubdomain"> | string
    node?: StringFilter<"EnsSubdomain"> | string
    ownerAddress?: StringFilter<"EnsSubdomain"> | string
    isAgentOwned?: BoolFilter<"EnsSubdomain"> | boolean
    agentId?: StringNullableFilter<"EnsSubdomain"> | string | null
    registeredAt?: DateTimeFilter<"EnsSubdomain"> | Date | string
    updatedAt?: DateTimeFilter<"EnsSubdomain"> | Date | string
    txHash?: StringNullableFilter<"EnsSubdomain"> | string | null
    agent?: XOR<AgentNullableScalarRelationFilter, AgentWhereInput> | null
  }

  export type EnsSubdomainOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    node?: SortOrder
    ownerAddress?: SortOrder
    isAgentOwned?: SortOrder
    agentId?: SortOrderInput | SortOrder
    registeredAt?: SortOrder
    updatedAt?: SortOrder
    txHash?: SortOrderInput | SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type EnsSubdomainWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    fullName?: string
    node?: string
    agentId?: string
    AND?: EnsSubdomainWhereInput | EnsSubdomainWhereInput[]
    OR?: EnsSubdomainWhereInput[]
    NOT?: EnsSubdomainWhereInput | EnsSubdomainWhereInput[]
    ownerAddress?: StringFilter<"EnsSubdomain"> | string
    isAgentOwned?: BoolFilter<"EnsSubdomain"> | boolean
    registeredAt?: DateTimeFilter<"EnsSubdomain"> | Date | string
    updatedAt?: DateTimeFilter<"EnsSubdomain"> | Date | string
    txHash?: StringNullableFilter<"EnsSubdomain"> | string | null
    agent?: XOR<AgentNullableScalarRelationFilter, AgentWhereInput> | null
  }, "id" | "name" | "fullName" | "node" | "agentId">

  export type EnsSubdomainOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    node?: SortOrder
    ownerAddress?: SortOrder
    isAgentOwned?: SortOrder
    agentId?: SortOrderInput | SortOrder
    registeredAt?: SortOrder
    updatedAt?: SortOrder
    txHash?: SortOrderInput | SortOrder
    _count?: EnsSubdomainCountOrderByAggregateInput
    _max?: EnsSubdomainMaxOrderByAggregateInput
    _min?: EnsSubdomainMinOrderByAggregateInput
  }

  export type EnsSubdomainScalarWhereWithAggregatesInput = {
    AND?: EnsSubdomainScalarWhereWithAggregatesInput | EnsSubdomainScalarWhereWithAggregatesInput[]
    OR?: EnsSubdomainScalarWhereWithAggregatesInput[]
    NOT?: EnsSubdomainScalarWhereWithAggregatesInput | EnsSubdomainScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EnsSubdomain"> | string
    name?: StringWithAggregatesFilter<"EnsSubdomain"> | string
    fullName?: StringWithAggregatesFilter<"EnsSubdomain"> | string
    node?: StringWithAggregatesFilter<"EnsSubdomain"> | string
    ownerAddress?: StringWithAggregatesFilter<"EnsSubdomain"> | string
    isAgentOwned?: BoolWithAggregatesFilter<"EnsSubdomain"> | boolean
    agentId?: StringNullableWithAggregatesFilter<"EnsSubdomain"> | string | null
    registeredAt?: DateTimeWithAggregatesFilter<"EnsSubdomain"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EnsSubdomain"> | Date | string
    txHash?: StringNullableWithAggregatesFilter<"EnsSubdomain"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    email?: string | null
    walletAddress: string
    walletDerivationIndex?: number | null
    openrouterApiKey?: string | null
    openaiApiKey?: string | null
    groqApiKey?: string | null
    grokApiKey?: string | null
    geminiApiKey?: string | null
    deepseekApiKey?: string | null
    zaiApiKey?: string | null
    anthropicApiKey?: string | null
    telegramId?: string | null
    telegramUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agents?: AgentCreateNestedManyWithoutOwnerInput
    agentTasks?: AgentTaskCreateNestedManyWithoutUserInput
    channelBindings?: ChannelBindingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email?: string | null
    walletAddress: string
    walletDerivationIndex?: number | null
    openrouterApiKey?: string | null
    openaiApiKey?: string | null
    groqApiKey?: string | null
    grokApiKey?: string | null
    geminiApiKey?: string | null
    deepseekApiKey?: string | null
    zaiApiKey?: string | null
    anthropicApiKey?: string | null
    telegramId?: string | null
    telegramUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agents?: AgentUncheckedCreateNestedManyWithoutOwnerInput
    agentTasks?: AgentTaskUncheckedCreateNestedManyWithoutUserInput
    channelBindings?: ChannelBindingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    openrouterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    openaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    groqApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    grokApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    deepseekApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    anthropicApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agents?: AgentUpdateManyWithoutOwnerNestedInput
    agentTasks?: AgentTaskUpdateManyWithoutUserNestedInput
    channelBindings?: ChannelBindingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    openrouterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    openaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    groqApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    grokApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    deepseekApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    anthropicApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agents?: AgentUncheckedUpdateManyWithoutOwnerNestedInput
    agentTasks?: AgentTaskUncheckedUpdateManyWithoutUserNestedInput
    channelBindings?: ChannelBindingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email?: string | null
    walletAddress: string
    walletDerivationIndex?: number | null
    openrouterApiKey?: string | null
    openaiApiKey?: string | null
    groqApiKey?: string | null
    grokApiKey?: string | null
    geminiApiKey?: string | null
    deepseekApiKey?: string | null
    zaiApiKey?: string | null
    anthropicApiKey?: string | null
    telegramId?: string | null
    telegramUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    openrouterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    openaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    groqApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    grokApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    deepseekApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    anthropicApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    openrouterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    openaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    groqApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    grokApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    deepseekApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    anthropicApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentCreateInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutAgentsInput
    transactions?: TransactionCreateNestedManyWithoutAgentInput
    activityLogs?: ActivityLogCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationCreateNestedOneWithoutAgentInput
    agentTasks?: AgentTaskCreateNestedManyWithoutAgentInput
    ensRegistration?: EnsSubdomainCreateNestedOneWithoutAgentInput
  }

  export type AgentUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutAgentInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingUncheckedCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationUncheckedCreateNestedOneWithoutAgentInput
    agentTasks?: AgentTaskUncheckedCreateNestedManyWithoutAgentInput
    ensRegistration?: EnsSubdomainUncheckedCreateNestedOneWithoutAgentInput
  }

  export type AgentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutAgentsNestedInput
    transactions?: TransactionUpdateManyWithoutAgentNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUpdateOneWithoutAgentNestedInput
    agentTasks?: AgentTaskUpdateManyWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUpdateOneWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutAgentNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUncheckedUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUncheckedUpdateOneWithoutAgentNestedInput
    agentTasks?: AgentTaskUncheckedUpdateManyWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUncheckedUpdateOneWithoutAgentNestedInput
  }

  export type AgentCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
  }

  export type AgentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AgentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChannelBindingCreateInput = {
    id?: string
    channelType: string
    senderIdentifier: string
    senderName?: string | null
    chatIdentifier?: string | null
    pairingCode?: string | null
    bindingType?: string
    isActive?: boolean
    pairedAt?: Date | string
    lastMessageAt?: Date | string
    agent: AgentCreateNestedOneWithoutChannelBindingsInput
    user?: UserCreateNestedOneWithoutChannelBindingsInput
    sessionMessages?: SessionMessageCreateNestedManyWithoutBindingInput
  }

  export type ChannelBindingUncheckedCreateInput = {
    id?: string
    agentId: string
    userId?: string | null
    channelType: string
    senderIdentifier: string
    senderName?: string | null
    chatIdentifier?: string | null
    pairingCode?: string | null
    bindingType?: string
    isActive?: boolean
    pairedAt?: Date | string
    lastMessageAt?: Date | string
    sessionMessages?: SessionMessageUncheckedCreateNestedManyWithoutBindingInput
  }

  export type ChannelBindingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelType?: StringFieldUpdateOperationsInput | string
    senderIdentifier?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    chatIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    bindingType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pairedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutChannelBindingsNestedInput
    user?: UserUpdateOneWithoutChannelBindingsNestedInput
    sessionMessages?: SessionMessageUpdateManyWithoutBindingNestedInput
  }

  export type ChannelBindingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    channelType?: StringFieldUpdateOperationsInput | string
    senderIdentifier?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    chatIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    bindingType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pairedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionMessages?: SessionMessageUncheckedUpdateManyWithoutBindingNestedInput
  }

  export type ChannelBindingCreateManyInput = {
    id?: string
    agentId: string
    userId?: string | null
    channelType: string
    senderIdentifier: string
    senderName?: string | null
    chatIdentifier?: string | null
    pairingCode?: string | null
    bindingType?: string
    isActive?: boolean
    pairedAt?: Date | string
    lastMessageAt?: Date | string
  }

  export type ChannelBindingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelType?: StringFieldUpdateOperationsInput | string
    senderIdentifier?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    chatIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    bindingType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pairedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelBindingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    channelType?: StringFieldUpdateOperationsInput | string
    senderIdentifier?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    chatIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    bindingType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pairedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionMessageCreateInput = {
    id?: string
    role: string
    content: string
    metadata?: string | null
    createdAt?: Date | string
    binding: ChannelBindingCreateNestedOneWithoutSessionMessagesInput
  }

  export type SessionMessageUncheckedCreateInput = {
    id?: string
    bindingId: string
    role: string
    content: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type SessionMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    binding?: ChannelBindingUpdateOneRequiredWithoutSessionMessagesNestedInput
  }

  export type SessionMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bindingId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionMessageCreateManyInput = {
    id?: string
    bindingId: string
    role: string
    content: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type SessionMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bindingId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentVerificationCreateInput = {
    id?: string
    publicKey: string
    encryptedPrivateKey: string
    status?: string
    sessionId?: string | null
    challenge?: string | null
    humanId?: string | null
    agentKeyHash?: string | null
    agentName?: string | null
    swarmUrl?: string | null
    selfxyzVerified?: boolean
    selfxyzRegisteredAt?: Date | string | null
    selfAppConfig?: string | null
    encryptedSelfclawApiKey?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutVerificationInput
  }

  export type AgentVerificationUncheckedCreateInput = {
    id?: string
    agentId: string
    publicKey: string
    encryptedPrivateKey: string
    status?: string
    sessionId?: string | null
    challenge?: string | null
    humanId?: string | null
    agentKeyHash?: string | null
    agentName?: string | null
    swarmUrl?: string | null
    selfxyzVerified?: boolean
    selfxyzRegisteredAt?: Date | string | null
    selfAppConfig?: string | null
    encryptedSelfclawApiKey?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentVerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    humanId?: NullableStringFieldUpdateOperationsInput | string | null
    agentKeyHash?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    swarmUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfxyzVerified?: BoolFieldUpdateOperationsInput | boolean
    selfxyzRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selfAppConfig?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedSelfclawApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutVerificationNestedInput
  }

  export type AgentVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    humanId?: NullableStringFieldUpdateOperationsInput | string | null
    agentKeyHash?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    swarmUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfxyzVerified?: BoolFieldUpdateOperationsInput | boolean
    selfxyzRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selfAppConfig?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedSelfclawApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentVerificationCreateManyInput = {
    id?: string
    agentId: string
    publicKey: string
    encryptedPrivateKey: string
    status?: string
    sessionId?: string | null
    challenge?: string | null
    humanId?: string | null
    agentKeyHash?: string | null
    agentName?: string | null
    swarmUrl?: string | null
    selfxyzVerified?: boolean
    selfxyzRegisteredAt?: Date | string | null
    selfAppConfig?: string | null
    encryptedSelfclawApiKey?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentVerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    humanId?: NullableStringFieldUpdateOperationsInput | string | null
    agentKeyHash?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    swarmUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfxyzVerified?: BoolFieldUpdateOperationsInput | boolean
    selfxyzRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selfAppConfig?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedSelfclawApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    humanId?: NullableStringFieldUpdateOperationsInput | string | null
    agentKeyHash?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    swarmUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfxyzVerified?: BoolFieldUpdateOperationsInput | boolean
    selfxyzRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selfAppConfig?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedSelfclawApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QRCodeCreateInput = {
    id?: string
    agentId?: string | null
    content: string
    dataUrl: string
    createdAt?: Date | string
  }

  export type QRCodeUncheckedCreateInput = {
    id?: string
    agentId?: string | null
    content: string
    dataUrl: string
    createdAt?: Date | string
  }

  export type QRCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    dataUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QRCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    dataUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QRCodeCreateManyInput = {
    id?: string
    agentId?: string | null
    content: string
    dataUrl: string
    createdAt?: Date | string
  }

  export type QRCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    dataUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QRCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    dataUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    txHash?: string | null
    type: string
    status?: string
    fromAddress?: string | null
    toAddress?: string | null
    amount?: number | null
    currency?: string | null
    gasUsed?: number | null
    blockNumber?: number | null
    description?: string | null
    createdAt?: Date | string
    agent: AgentCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    agentId: string
    txHash?: string | null
    type: string
    status?: string
    fromAddress?: string | null
    toAddress?: string | null
    amount?: number | null
    currency?: string | null
    gasUsed?: number | null
    blockNumber?: number | null
    description?: string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    gasUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    gasUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    agentId: string
    txHash?: string | null
    type: string
    status?: string
    fromAddress?: string | null
    toAddress?: string | null
    amount?: number | null
    currency?: string | null
    gasUsed?: number | null
    blockNumber?: number | null
    description?: string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    gasUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    gasUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateInput = {
    id?: string
    type: string
    message: string
    metadata?: string | null
    createdAt?: Date | string
    agent: AgentCreateNestedOneWithoutActivityLogsInput
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: string
    agentId: string
    type: string
    message: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutActivityLogsNestedInput
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateManyInput = {
    id?: string
    agentId: string
    type: string
    message: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentTaskCreateInput = {
    id?: string
    triggerType: string
    tokenSymbol?: string | null
    conditionType?: string | null
    targetValue?: number | null
    baselinePrice?: number | null
    executeAt?: Date | string | null
    cronSchedule?: string | null
    lastExecutedAt?: Date | string | null
    actionType: string
    actionPayload: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutAgentTasksInput
    user: UserCreateNestedOneWithoutAgentTasksInput
  }

  export type AgentTaskUncheckedCreateInput = {
    id?: string
    agentId: string
    userId: string
    triggerType: string
    tokenSymbol?: string | null
    conditionType?: string | null
    targetValue?: number | null
    baselinePrice?: number | null
    executeAt?: Date | string | null
    cronSchedule?: string | null
    lastExecutedAt?: Date | string | null
    actionType: string
    actionPayload: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentTaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    triggerType?: StringFieldUpdateOperationsInput | string
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionType?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableFloatFieldUpdateOperationsInput | number | null
    baselinePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    executeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    actionPayload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutAgentTasksNestedInput
    user?: UserUpdateOneRequiredWithoutAgentTasksNestedInput
  }

  export type AgentTaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    triggerType?: StringFieldUpdateOperationsInput | string
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionType?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableFloatFieldUpdateOperationsInput | number | null
    baselinePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    executeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    actionPayload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentTaskCreateManyInput = {
    id?: string
    agentId: string
    userId: string
    triggerType: string
    tokenSymbol?: string | null
    conditionType?: string | null
    targetValue?: number | null
    baselinePrice?: number | null
    executeAt?: Date | string | null
    cronSchedule?: string | null
    lastExecutedAt?: Date | string | null
    actionType: string
    actionPayload: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentTaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    triggerType?: StringFieldUpdateOperationsInput | string
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionType?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableFloatFieldUpdateOperationsInput | number | null
    baselinePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    executeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    actionPayload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentTaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    triggerType?: StringFieldUpdateOperationsInput | string
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionType?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableFloatFieldUpdateOperationsInput | number | null
    baselinePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    executeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    actionPayload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnsSubdomainCreateInput = {
    id?: string
    name: string
    fullName: string
    node: string
    ownerAddress: string
    isAgentOwned?: boolean
    registeredAt?: Date | string
    updatedAt?: Date | string
    txHash?: string | null
    agent?: AgentCreateNestedOneWithoutEnsRegistrationInput
  }

  export type EnsSubdomainUncheckedCreateInput = {
    id?: string
    name: string
    fullName: string
    node: string
    ownerAddress: string
    isAgentOwned?: boolean
    agentId?: string | null
    registeredAt?: Date | string
    updatedAt?: Date | string
    txHash?: string | null
  }

  export type EnsSubdomainUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    node?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    isAgentOwned?: BoolFieldUpdateOperationsInput | boolean
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    agent?: AgentUpdateOneWithoutEnsRegistrationNestedInput
  }

  export type EnsSubdomainUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    node?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    isAgentOwned?: BoolFieldUpdateOperationsInput | boolean
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnsSubdomainCreateManyInput = {
    id?: string
    name: string
    fullName: string
    node: string
    ownerAddress: string
    isAgentOwned?: boolean
    agentId?: string | null
    registeredAt?: Date | string
    updatedAt?: Date | string
    txHash?: string | null
  }

  export type EnsSubdomainUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    node?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    isAgentOwned?: BoolFieldUpdateOperationsInput | boolean
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnsSubdomainUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    node?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    isAgentOwned?: BoolFieldUpdateOperationsInput | boolean
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AgentListRelationFilter = {
    every?: AgentWhereInput
    some?: AgentWhereInput
    none?: AgentWhereInput
  }

  export type AgentTaskListRelationFilter = {
    every?: AgentTaskWhereInput
    some?: AgentTaskWhereInput
    none?: AgentTaskWhereInput
  }

  export type ChannelBindingListRelationFilter = {
    every?: ChannelBindingWhereInput
    some?: ChannelBindingWhereInput
    none?: ChannelBindingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AgentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentTaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChannelBindingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    walletAddress?: SortOrder
    walletDerivationIndex?: SortOrder
    openrouterApiKey?: SortOrder
    openaiApiKey?: SortOrder
    groqApiKey?: SortOrder
    grokApiKey?: SortOrder
    geminiApiKey?: SortOrder
    deepseekApiKey?: SortOrder
    zaiApiKey?: SortOrder
    anthropicApiKey?: SortOrder
    telegramId?: SortOrder
    telegramUsername?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    walletDerivationIndex?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    walletAddress?: SortOrder
    walletDerivationIndex?: SortOrder
    openrouterApiKey?: SortOrder
    openaiApiKey?: SortOrder
    groqApiKey?: SortOrder
    grokApiKey?: SortOrder
    geminiApiKey?: SortOrder
    deepseekApiKey?: SortOrder
    zaiApiKey?: SortOrder
    anthropicApiKey?: SortOrder
    telegramId?: SortOrder
    telegramUsername?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    walletAddress?: SortOrder
    walletDerivationIndex?: SortOrder
    openrouterApiKey?: SortOrder
    openaiApiKey?: SortOrder
    groqApiKey?: SortOrder
    grokApiKey?: SortOrder
    geminiApiKey?: SortOrder
    deepseekApiKey?: SortOrder
    zaiApiKey?: SortOrder
    anthropicApiKey?: SortOrder
    telegramId?: SortOrder
    telegramUsername?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    walletDerivationIndex?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type ActivityLogListRelationFilter = {
    every?: ActivityLogWhereInput
    some?: ActivityLogWhereInput
    none?: ActivityLogWhereInput
  }

  export type AgentVerificationNullableScalarRelationFilter = {
    is?: AgentVerificationWhereInput | null
    isNot?: AgentVerificationWhereInput | null
  }

  export type EnsSubdomainNullableScalarRelationFilter = {
    is?: EnsSubdomainWhereInput | null
    isNot?: EnsSubdomainWhereInput | null
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    templateType?: SortOrder
    status?: SortOrder
    systemPrompt?: SortOrder
    llmProvider?: SortOrder
    llmModel?: SortOrder
    spendingLimit?: SortOrder
    spendingUsed?: SortOrder
    agentWalletAddress?: SortOrder
    walletDerivationIndex?: SortOrder
    walletType?: SortOrder
    sessionKeyAddress?: SortOrder
    sessionKeyPrivateKey?: SortOrder
    sessionContext?: SortOrder
    sessionExpiresAt?: SortOrder
    sessionPermissions?: SortOrder
    telegramBotToken?: SortOrder
    telegramChatIds?: SortOrder
    discordBotToken?: SortOrder
    webhookSecret?: SortOrder
    disabledSkills?: SortOrder
    externalSocials?: SortOrder
    channels?: SortOrder
    cronJobs?: SortOrder
    pairingCode?: SortOrder
    pairingCodeExpiresAt?: SortOrder
    openclawAgentId?: SortOrder
    imageUrl?: SortOrder
    imageSlug?: SortOrder
    imageDataBase64?: SortOrder
    erc8004AgentId?: SortOrder
    erc8004URI?: SortOrder
    erc8004TxHash?: SortOrder
    erc8004ChainId?: SortOrder
    reputationScore?: SortOrder
    exported?: SortOrder
    exportedAt?: SortOrder
    configuration?: SortOrder
    ensSubdomain?: SortOrder
    ensNode?: SortOrder
    ensRegisteredAt?: SortOrder
    agentDeployedTokens?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deployedAt?: SortOrder
  }

  export type AgentAvgOrderByAggregateInput = {
    spendingLimit?: SortOrder
    spendingUsed?: SortOrder
    walletDerivationIndex?: SortOrder
    erc8004ChainId?: SortOrder
    reputationScore?: SortOrder
  }

  export type AgentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    templateType?: SortOrder
    status?: SortOrder
    systemPrompt?: SortOrder
    llmProvider?: SortOrder
    llmModel?: SortOrder
    spendingLimit?: SortOrder
    spendingUsed?: SortOrder
    agentWalletAddress?: SortOrder
    walletDerivationIndex?: SortOrder
    walletType?: SortOrder
    sessionKeyAddress?: SortOrder
    sessionKeyPrivateKey?: SortOrder
    sessionContext?: SortOrder
    sessionExpiresAt?: SortOrder
    sessionPermissions?: SortOrder
    telegramBotToken?: SortOrder
    telegramChatIds?: SortOrder
    discordBotToken?: SortOrder
    webhookSecret?: SortOrder
    disabledSkills?: SortOrder
    externalSocials?: SortOrder
    channels?: SortOrder
    cronJobs?: SortOrder
    pairingCode?: SortOrder
    pairingCodeExpiresAt?: SortOrder
    openclawAgentId?: SortOrder
    imageUrl?: SortOrder
    imageSlug?: SortOrder
    imageDataBase64?: SortOrder
    erc8004AgentId?: SortOrder
    erc8004URI?: SortOrder
    erc8004TxHash?: SortOrder
    erc8004ChainId?: SortOrder
    reputationScore?: SortOrder
    exported?: SortOrder
    exportedAt?: SortOrder
    configuration?: SortOrder
    ensSubdomain?: SortOrder
    ensNode?: SortOrder
    ensRegisteredAt?: SortOrder
    agentDeployedTokens?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deployedAt?: SortOrder
  }

  export type AgentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    templateType?: SortOrder
    status?: SortOrder
    systemPrompt?: SortOrder
    llmProvider?: SortOrder
    llmModel?: SortOrder
    spendingLimit?: SortOrder
    spendingUsed?: SortOrder
    agentWalletAddress?: SortOrder
    walletDerivationIndex?: SortOrder
    walletType?: SortOrder
    sessionKeyAddress?: SortOrder
    sessionKeyPrivateKey?: SortOrder
    sessionContext?: SortOrder
    sessionExpiresAt?: SortOrder
    sessionPermissions?: SortOrder
    telegramBotToken?: SortOrder
    telegramChatIds?: SortOrder
    discordBotToken?: SortOrder
    webhookSecret?: SortOrder
    disabledSkills?: SortOrder
    externalSocials?: SortOrder
    channels?: SortOrder
    cronJobs?: SortOrder
    pairingCode?: SortOrder
    pairingCodeExpiresAt?: SortOrder
    openclawAgentId?: SortOrder
    imageUrl?: SortOrder
    imageSlug?: SortOrder
    imageDataBase64?: SortOrder
    erc8004AgentId?: SortOrder
    erc8004URI?: SortOrder
    erc8004TxHash?: SortOrder
    erc8004ChainId?: SortOrder
    reputationScore?: SortOrder
    exported?: SortOrder
    exportedAt?: SortOrder
    configuration?: SortOrder
    ensSubdomain?: SortOrder
    ensNode?: SortOrder
    ensRegisteredAt?: SortOrder
    agentDeployedTokens?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deployedAt?: SortOrder
  }

  export type AgentSumOrderByAggregateInput = {
    spendingLimit?: SortOrder
    spendingUsed?: SortOrder
    walletDerivationIndex?: SortOrder
    erc8004ChainId?: SortOrder
    reputationScore?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AgentScalarRelationFilter = {
    is?: AgentWhereInput
    isNot?: AgentWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SessionMessageListRelationFilter = {
    every?: SessionMessageWhereInput
    some?: SessionMessageWhereInput
    none?: SessionMessageWhereInput
  }

  export type SessionMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChannelBindingCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    channelType?: SortOrder
    senderIdentifier?: SortOrder
    senderName?: SortOrder
    chatIdentifier?: SortOrder
    pairingCode?: SortOrder
    bindingType?: SortOrder
    isActive?: SortOrder
    pairedAt?: SortOrder
    lastMessageAt?: SortOrder
  }

  export type ChannelBindingMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    channelType?: SortOrder
    senderIdentifier?: SortOrder
    senderName?: SortOrder
    chatIdentifier?: SortOrder
    pairingCode?: SortOrder
    bindingType?: SortOrder
    isActive?: SortOrder
    pairedAt?: SortOrder
    lastMessageAt?: SortOrder
  }

  export type ChannelBindingMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    channelType?: SortOrder
    senderIdentifier?: SortOrder
    senderName?: SortOrder
    chatIdentifier?: SortOrder
    pairingCode?: SortOrder
    bindingType?: SortOrder
    isActive?: SortOrder
    pairedAt?: SortOrder
    lastMessageAt?: SortOrder
  }

  export type ChannelBindingScalarRelationFilter = {
    is?: ChannelBindingWhereInput
    isNot?: ChannelBindingWhereInput
  }

  export type SessionMessageCountOrderByAggregateInput = {
    id?: SortOrder
    bindingId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    bindingId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMessageMinOrderByAggregateInput = {
    id?: SortOrder
    bindingId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    publicKey?: SortOrder
    encryptedPrivateKey?: SortOrder
    status?: SortOrder
    sessionId?: SortOrder
    challenge?: SortOrder
    humanId?: SortOrder
    agentKeyHash?: SortOrder
    agentName?: SortOrder
    swarmUrl?: SortOrder
    selfxyzVerified?: SortOrder
    selfxyzRegisteredAt?: SortOrder
    selfAppConfig?: SortOrder
    encryptedSelfclawApiKey?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    publicKey?: SortOrder
    encryptedPrivateKey?: SortOrder
    status?: SortOrder
    sessionId?: SortOrder
    challenge?: SortOrder
    humanId?: SortOrder
    agentKeyHash?: SortOrder
    agentName?: SortOrder
    swarmUrl?: SortOrder
    selfxyzVerified?: SortOrder
    selfxyzRegisteredAt?: SortOrder
    selfAppConfig?: SortOrder
    encryptedSelfclawApiKey?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    publicKey?: SortOrder
    encryptedPrivateKey?: SortOrder
    status?: SortOrder
    sessionId?: SortOrder
    challenge?: SortOrder
    humanId?: SortOrder
    agentKeyHash?: SortOrder
    agentName?: SortOrder
    swarmUrl?: SortOrder
    selfxyzVerified?: SortOrder
    selfxyzRegisteredAt?: SortOrder
    selfAppConfig?: SortOrder
    encryptedSelfclawApiKey?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QRCodeCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    content?: SortOrder
    dataUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type QRCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    content?: SortOrder
    dataUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type QRCodeMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    content?: SortOrder
    dataUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    txHash?: SortOrder
    type?: SortOrder
    status?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    gasUsed?: SortOrder
    blockNumber?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    gasUsed?: SortOrder
    blockNumber?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    txHash?: SortOrder
    type?: SortOrder
    status?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    gasUsed?: SortOrder
    blockNumber?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    txHash?: SortOrder
    type?: SortOrder
    status?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    gasUsed?: SortOrder
    blockNumber?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    gasUsed?: SortOrder
    blockNumber?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentTaskCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    triggerType?: SortOrder
    tokenSymbol?: SortOrder
    conditionType?: SortOrder
    targetValue?: SortOrder
    baselinePrice?: SortOrder
    executeAt?: SortOrder
    cronSchedule?: SortOrder
    lastExecutedAt?: SortOrder
    actionType?: SortOrder
    actionPayload?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentTaskAvgOrderByAggregateInput = {
    targetValue?: SortOrder
    baselinePrice?: SortOrder
  }

  export type AgentTaskMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    triggerType?: SortOrder
    tokenSymbol?: SortOrder
    conditionType?: SortOrder
    targetValue?: SortOrder
    baselinePrice?: SortOrder
    executeAt?: SortOrder
    cronSchedule?: SortOrder
    lastExecutedAt?: SortOrder
    actionType?: SortOrder
    actionPayload?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentTaskMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    triggerType?: SortOrder
    tokenSymbol?: SortOrder
    conditionType?: SortOrder
    targetValue?: SortOrder
    baselinePrice?: SortOrder
    executeAt?: SortOrder
    cronSchedule?: SortOrder
    lastExecutedAt?: SortOrder
    actionType?: SortOrder
    actionPayload?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentTaskSumOrderByAggregateInput = {
    targetValue?: SortOrder
    baselinePrice?: SortOrder
  }

  export type AgentNullableScalarRelationFilter = {
    is?: AgentWhereInput | null
    isNot?: AgentWhereInput | null
  }

  export type EnsSubdomainCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    node?: SortOrder
    ownerAddress?: SortOrder
    isAgentOwned?: SortOrder
    agentId?: SortOrder
    registeredAt?: SortOrder
    updatedAt?: SortOrder
    txHash?: SortOrder
  }

  export type EnsSubdomainMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    node?: SortOrder
    ownerAddress?: SortOrder
    isAgentOwned?: SortOrder
    agentId?: SortOrder
    registeredAt?: SortOrder
    updatedAt?: SortOrder
    txHash?: SortOrder
  }

  export type EnsSubdomainMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    node?: SortOrder
    ownerAddress?: SortOrder
    isAgentOwned?: SortOrder
    agentId?: SortOrder
    registeredAt?: SortOrder
    updatedAt?: SortOrder
    txHash?: SortOrder
  }

  export type AgentCreateNestedManyWithoutOwnerInput = {
    create?: XOR<AgentCreateWithoutOwnerInput, AgentUncheckedCreateWithoutOwnerInput> | AgentCreateWithoutOwnerInput[] | AgentUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutOwnerInput | AgentCreateOrConnectWithoutOwnerInput[]
    createMany?: AgentCreateManyOwnerInputEnvelope
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
  }

  export type AgentTaskCreateNestedManyWithoutUserInput = {
    create?: XOR<AgentTaskCreateWithoutUserInput, AgentTaskUncheckedCreateWithoutUserInput> | AgentTaskCreateWithoutUserInput[] | AgentTaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentTaskCreateOrConnectWithoutUserInput | AgentTaskCreateOrConnectWithoutUserInput[]
    createMany?: AgentTaskCreateManyUserInputEnvelope
    connect?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
  }

  export type ChannelBindingCreateNestedManyWithoutUserInput = {
    create?: XOR<ChannelBindingCreateWithoutUserInput, ChannelBindingUncheckedCreateWithoutUserInput> | ChannelBindingCreateWithoutUserInput[] | ChannelBindingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChannelBindingCreateOrConnectWithoutUserInput | ChannelBindingCreateOrConnectWithoutUserInput[]
    createMany?: ChannelBindingCreateManyUserInputEnvelope
    connect?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
  }

  export type AgentUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<AgentCreateWithoutOwnerInput, AgentUncheckedCreateWithoutOwnerInput> | AgentCreateWithoutOwnerInput[] | AgentUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutOwnerInput | AgentCreateOrConnectWithoutOwnerInput[]
    createMany?: AgentCreateManyOwnerInputEnvelope
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
  }

  export type AgentTaskUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AgentTaskCreateWithoutUserInput, AgentTaskUncheckedCreateWithoutUserInput> | AgentTaskCreateWithoutUserInput[] | AgentTaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentTaskCreateOrConnectWithoutUserInput | AgentTaskCreateOrConnectWithoutUserInput[]
    createMany?: AgentTaskCreateManyUserInputEnvelope
    connect?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
  }

  export type ChannelBindingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ChannelBindingCreateWithoutUserInput, ChannelBindingUncheckedCreateWithoutUserInput> | ChannelBindingCreateWithoutUserInput[] | ChannelBindingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChannelBindingCreateOrConnectWithoutUserInput | ChannelBindingCreateOrConnectWithoutUserInput[]
    createMany?: ChannelBindingCreateManyUserInputEnvelope
    connect?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AgentUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<AgentCreateWithoutOwnerInput, AgentUncheckedCreateWithoutOwnerInput> | AgentCreateWithoutOwnerInput[] | AgentUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutOwnerInput | AgentCreateOrConnectWithoutOwnerInput[]
    upsert?: AgentUpsertWithWhereUniqueWithoutOwnerInput | AgentUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: AgentCreateManyOwnerInputEnvelope
    set?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    disconnect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    delete?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    update?: AgentUpdateWithWhereUniqueWithoutOwnerInput | AgentUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: AgentUpdateManyWithWhereWithoutOwnerInput | AgentUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: AgentScalarWhereInput | AgentScalarWhereInput[]
  }

  export type AgentTaskUpdateManyWithoutUserNestedInput = {
    create?: XOR<AgentTaskCreateWithoutUserInput, AgentTaskUncheckedCreateWithoutUserInput> | AgentTaskCreateWithoutUserInput[] | AgentTaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentTaskCreateOrConnectWithoutUserInput | AgentTaskCreateOrConnectWithoutUserInput[]
    upsert?: AgentTaskUpsertWithWhereUniqueWithoutUserInput | AgentTaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AgentTaskCreateManyUserInputEnvelope
    set?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    disconnect?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    delete?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    connect?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    update?: AgentTaskUpdateWithWhereUniqueWithoutUserInput | AgentTaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AgentTaskUpdateManyWithWhereWithoutUserInput | AgentTaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AgentTaskScalarWhereInput | AgentTaskScalarWhereInput[]
  }

  export type ChannelBindingUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChannelBindingCreateWithoutUserInput, ChannelBindingUncheckedCreateWithoutUserInput> | ChannelBindingCreateWithoutUserInput[] | ChannelBindingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChannelBindingCreateOrConnectWithoutUserInput | ChannelBindingCreateOrConnectWithoutUserInput[]
    upsert?: ChannelBindingUpsertWithWhereUniqueWithoutUserInput | ChannelBindingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChannelBindingCreateManyUserInputEnvelope
    set?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    disconnect?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    delete?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    connect?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    update?: ChannelBindingUpdateWithWhereUniqueWithoutUserInput | ChannelBindingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChannelBindingUpdateManyWithWhereWithoutUserInput | ChannelBindingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChannelBindingScalarWhereInput | ChannelBindingScalarWhereInput[]
  }

  export type AgentUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<AgentCreateWithoutOwnerInput, AgentUncheckedCreateWithoutOwnerInput> | AgentCreateWithoutOwnerInput[] | AgentUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutOwnerInput | AgentCreateOrConnectWithoutOwnerInput[]
    upsert?: AgentUpsertWithWhereUniqueWithoutOwnerInput | AgentUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: AgentCreateManyOwnerInputEnvelope
    set?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    disconnect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    delete?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    update?: AgentUpdateWithWhereUniqueWithoutOwnerInput | AgentUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: AgentUpdateManyWithWhereWithoutOwnerInput | AgentUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: AgentScalarWhereInput | AgentScalarWhereInput[]
  }

  export type AgentTaskUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AgentTaskCreateWithoutUserInput, AgentTaskUncheckedCreateWithoutUserInput> | AgentTaskCreateWithoutUserInput[] | AgentTaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentTaskCreateOrConnectWithoutUserInput | AgentTaskCreateOrConnectWithoutUserInput[]
    upsert?: AgentTaskUpsertWithWhereUniqueWithoutUserInput | AgentTaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AgentTaskCreateManyUserInputEnvelope
    set?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    disconnect?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    delete?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    connect?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    update?: AgentTaskUpdateWithWhereUniqueWithoutUserInput | AgentTaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AgentTaskUpdateManyWithWhereWithoutUserInput | AgentTaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AgentTaskScalarWhereInput | AgentTaskScalarWhereInput[]
  }

  export type ChannelBindingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChannelBindingCreateWithoutUserInput, ChannelBindingUncheckedCreateWithoutUserInput> | ChannelBindingCreateWithoutUserInput[] | ChannelBindingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChannelBindingCreateOrConnectWithoutUserInput | ChannelBindingCreateOrConnectWithoutUserInput[]
    upsert?: ChannelBindingUpsertWithWhereUniqueWithoutUserInput | ChannelBindingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChannelBindingCreateManyUserInputEnvelope
    set?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    disconnect?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    delete?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    connect?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    update?: ChannelBindingUpdateWithWhereUniqueWithoutUserInput | ChannelBindingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChannelBindingUpdateManyWithWhereWithoutUserInput | ChannelBindingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChannelBindingScalarWhereInput | ChannelBindingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAgentsInput = {
    create?: XOR<UserCreateWithoutAgentsInput, UserUncheckedCreateWithoutAgentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgentsInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutAgentInput = {
    create?: XOR<TransactionCreateWithoutAgentInput, TransactionUncheckedCreateWithoutAgentInput> | TransactionCreateWithoutAgentInput[] | TransactionUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAgentInput | TransactionCreateOrConnectWithoutAgentInput[]
    createMany?: TransactionCreateManyAgentInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ActivityLogCreateNestedManyWithoutAgentInput = {
    create?: XOR<ActivityLogCreateWithoutAgentInput, ActivityLogUncheckedCreateWithoutAgentInput> | ActivityLogCreateWithoutAgentInput[] | ActivityLogUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutAgentInput | ActivityLogCreateOrConnectWithoutAgentInput[]
    createMany?: ActivityLogCreateManyAgentInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type ChannelBindingCreateNestedManyWithoutAgentInput = {
    create?: XOR<ChannelBindingCreateWithoutAgentInput, ChannelBindingUncheckedCreateWithoutAgentInput> | ChannelBindingCreateWithoutAgentInput[] | ChannelBindingUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ChannelBindingCreateOrConnectWithoutAgentInput | ChannelBindingCreateOrConnectWithoutAgentInput[]
    createMany?: ChannelBindingCreateManyAgentInputEnvelope
    connect?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
  }

  export type AgentVerificationCreateNestedOneWithoutAgentInput = {
    create?: XOR<AgentVerificationCreateWithoutAgentInput, AgentVerificationUncheckedCreateWithoutAgentInput>
    connectOrCreate?: AgentVerificationCreateOrConnectWithoutAgentInput
    connect?: AgentVerificationWhereUniqueInput
  }

  export type AgentTaskCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentTaskCreateWithoutAgentInput, AgentTaskUncheckedCreateWithoutAgentInput> | AgentTaskCreateWithoutAgentInput[] | AgentTaskUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentTaskCreateOrConnectWithoutAgentInput | AgentTaskCreateOrConnectWithoutAgentInput[]
    createMany?: AgentTaskCreateManyAgentInputEnvelope
    connect?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
  }

  export type EnsSubdomainCreateNestedOneWithoutAgentInput = {
    create?: XOR<EnsSubdomainCreateWithoutAgentInput, EnsSubdomainUncheckedCreateWithoutAgentInput>
    connectOrCreate?: EnsSubdomainCreateOrConnectWithoutAgentInput
    connect?: EnsSubdomainWhereUniqueInput
  }

  export type TransactionUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<TransactionCreateWithoutAgentInput, TransactionUncheckedCreateWithoutAgentInput> | TransactionCreateWithoutAgentInput[] | TransactionUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAgentInput | TransactionCreateOrConnectWithoutAgentInput[]
    createMany?: TransactionCreateManyAgentInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ActivityLogUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<ActivityLogCreateWithoutAgentInput, ActivityLogUncheckedCreateWithoutAgentInput> | ActivityLogCreateWithoutAgentInput[] | ActivityLogUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutAgentInput | ActivityLogCreateOrConnectWithoutAgentInput[]
    createMany?: ActivityLogCreateManyAgentInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type ChannelBindingUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<ChannelBindingCreateWithoutAgentInput, ChannelBindingUncheckedCreateWithoutAgentInput> | ChannelBindingCreateWithoutAgentInput[] | ChannelBindingUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ChannelBindingCreateOrConnectWithoutAgentInput | ChannelBindingCreateOrConnectWithoutAgentInput[]
    createMany?: ChannelBindingCreateManyAgentInputEnvelope
    connect?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
  }

  export type AgentVerificationUncheckedCreateNestedOneWithoutAgentInput = {
    create?: XOR<AgentVerificationCreateWithoutAgentInput, AgentVerificationUncheckedCreateWithoutAgentInput>
    connectOrCreate?: AgentVerificationCreateOrConnectWithoutAgentInput
    connect?: AgentVerificationWhereUniqueInput
  }

  export type AgentTaskUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentTaskCreateWithoutAgentInput, AgentTaskUncheckedCreateWithoutAgentInput> | AgentTaskCreateWithoutAgentInput[] | AgentTaskUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentTaskCreateOrConnectWithoutAgentInput | AgentTaskCreateOrConnectWithoutAgentInput[]
    createMany?: AgentTaskCreateManyAgentInputEnvelope
    connect?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
  }

  export type EnsSubdomainUncheckedCreateNestedOneWithoutAgentInput = {
    create?: XOR<EnsSubdomainCreateWithoutAgentInput, EnsSubdomainUncheckedCreateWithoutAgentInput>
    connectOrCreate?: EnsSubdomainCreateOrConnectWithoutAgentInput
    connect?: EnsSubdomainWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutAgentsNestedInput = {
    create?: XOR<UserCreateWithoutAgentsInput, UserUncheckedCreateWithoutAgentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgentsInput
    upsert?: UserUpsertWithoutAgentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAgentsInput, UserUpdateWithoutAgentsInput>, UserUncheckedUpdateWithoutAgentsInput>
  }

  export type TransactionUpdateManyWithoutAgentNestedInput = {
    create?: XOR<TransactionCreateWithoutAgentInput, TransactionUncheckedCreateWithoutAgentInput> | TransactionCreateWithoutAgentInput[] | TransactionUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAgentInput | TransactionCreateOrConnectWithoutAgentInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutAgentInput | TransactionUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: TransactionCreateManyAgentInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutAgentInput | TransactionUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutAgentInput | TransactionUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ActivityLogUpdateManyWithoutAgentNestedInput = {
    create?: XOR<ActivityLogCreateWithoutAgentInput, ActivityLogUncheckedCreateWithoutAgentInput> | ActivityLogCreateWithoutAgentInput[] | ActivityLogUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutAgentInput | ActivityLogCreateOrConnectWithoutAgentInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutAgentInput | ActivityLogUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: ActivityLogCreateManyAgentInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutAgentInput | ActivityLogUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutAgentInput | ActivityLogUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type ChannelBindingUpdateManyWithoutAgentNestedInput = {
    create?: XOR<ChannelBindingCreateWithoutAgentInput, ChannelBindingUncheckedCreateWithoutAgentInput> | ChannelBindingCreateWithoutAgentInput[] | ChannelBindingUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ChannelBindingCreateOrConnectWithoutAgentInput | ChannelBindingCreateOrConnectWithoutAgentInput[]
    upsert?: ChannelBindingUpsertWithWhereUniqueWithoutAgentInput | ChannelBindingUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: ChannelBindingCreateManyAgentInputEnvelope
    set?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    disconnect?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    delete?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    connect?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    update?: ChannelBindingUpdateWithWhereUniqueWithoutAgentInput | ChannelBindingUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: ChannelBindingUpdateManyWithWhereWithoutAgentInput | ChannelBindingUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: ChannelBindingScalarWhereInput | ChannelBindingScalarWhereInput[]
  }

  export type AgentVerificationUpdateOneWithoutAgentNestedInput = {
    create?: XOR<AgentVerificationCreateWithoutAgentInput, AgentVerificationUncheckedCreateWithoutAgentInput>
    connectOrCreate?: AgentVerificationCreateOrConnectWithoutAgentInput
    upsert?: AgentVerificationUpsertWithoutAgentInput
    disconnect?: AgentVerificationWhereInput | boolean
    delete?: AgentVerificationWhereInput | boolean
    connect?: AgentVerificationWhereUniqueInput
    update?: XOR<XOR<AgentVerificationUpdateToOneWithWhereWithoutAgentInput, AgentVerificationUpdateWithoutAgentInput>, AgentVerificationUncheckedUpdateWithoutAgentInput>
  }

  export type AgentTaskUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentTaskCreateWithoutAgentInput, AgentTaskUncheckedCreateWithoutAgentInput> | AgentTaskCreateWithoutAgentInput[] | AgentTaskUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentTaskCreateOrConnectWithoutAgentInput | AgentTaskCreateOrConnectWithoutAgentInput[]
    upsert?: AgentTaskUpsertWithWhereUniqueWithoutAgentInput | AgentTaskUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentTaskCreateManyAgentInputEnvelope
    set?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    disconnect?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    delete?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    connect?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    update?: AgentTaskUpdateWithWhereUniqueWithoutAgentInput | AgentTaskUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentTaskUpdateManyWithWhereWithoutAgentInput | AgentTaskUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentTaskScalarWhereInput | AgentTaskScalarWhereInput[]
  }

  export type EnsSubdomainUpdateOneWithoutAgentNestedInput = {
    create?: XOR<EnsSubdomainCreateWithoutAgentInput, EnsSubdomainUncheckedCreateWithoutAgentInput>
    connectOrCreate?: EnsSubdomainCreateOrConnectWithoutAgentInput
    upsert?: EnsSubdomainUpsertWithoutAgentInput
    disconnect?: EnsSubdomainWhereInput | boolean
    delete?: EnsSubdomainWhereInput | boolean
    connect?: EnsSubdomainWhereUniqueInput
    update?: XOR<XOR<EnsSubdomainUpdateToOneWithWhereWithoutAgentInput, EnsSubdomainUpdateWithoutAgentInput>, EnsSubdomainUncheckedUpdateWithoutAgentInput>
  }

  export type TransactionUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<TransactionCreateWithoutAgentInput, TransactionUncheckedCreateWithoutAgentInput> | TransactionCreateWithoutAgentInput[] | TransactionUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAgentInput | TransactionCreateOrConnectWithoutAgentInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutAgentInput | TransactionUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: TransactionCreateManyAgentInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutAgentInput | TransactionUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutAgentInput | TransactionUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ActivityLogUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<ActivityLogCreateWithoutAgentInput, ActivityLogUncheckedCreateWithoutAgentInput> | ActivityLogCreateWithoutAgentInput[] | ActivityLogUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutAgentInput | ActivityLogCreateOrConnectWithoutAgentInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutAgentInput | ActivityLogUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: ActivityLogCreateManyAgentInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutAgentInput | ActivityLogUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutAgentInput | ActivityLogUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type ChannelBindingUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<ChannelBindingCreateWithoutAgentInput, ChannelBindingUncheckedCreateWithoutAgentInput> | ChannelBindingCreateWithoutAgentInput[] | ChannelBindingUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ChannelBindingCreateOrConnectWithoutAgentInput | ChannelBindingCreateOrConnectWithoutAgentInput[]
    upsert?: ChannelBindingUpsertWithWhereUniqueWithoutAgentInput | ChannelBindingUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: ChannelBindingCreateManyAgentInputEnvelope
    set?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    disconnect?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    delete?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    connect?: ChannelBindingWhereUniqueInput | ChannelBindingWhereUniqueInput[]
    update?: ChannelBindingUpdateWithWhereUniqueWithoutAgentInput | ChannelBindingUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: ChannelBindingUpdateManyWithWhereWithoutAgentInput | ChannelBindingUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: ChannelBindingScalarWhereInput | ChannelBindingScalarWhereInput[]
  }

  export type AgentVerificationUncheckedUpdateOneWithoutAgentNestedInput = {
    create?: XOR<AgentVerificationCreateWithoutAgentInput, AgentVerificationUncheckedCreateWithoutAgentInput>
    connectOrCreate?: AgentVerificationCreateOrConnectWithoutAgentInput
    upsert?: AgentVerificationUpsertWithoutAgentInput
    disconnect?: AgentVerificationWhereInput | boolean
    delete?: AgentVerificationWhereInput | boolean
    connect?: AgentVerificationWhereUniqueInput
    update?: XOR<XOR<AgentVerificationUpdateToOneWithWhereWithoutAgentInput, AgentVerificationUpdateWithoutAgentInput>, AgentVerificationUncheckedUpdateWithoutAgentInput>
  }

  export type AgentTaskUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentTaskCreateWithoutAgentInput, AgentTaskUncheckedCreateWithoutAgentInput> | AgentTaskCreateWithoutAgentInput[] | AgentTaskUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentTaskCreateOrConnectWithoutAgentInput | AgentTaskCreateOrConnectWithoutAgentInput[]
    upsert?: AgentTaskUpsertWithWhereUniqueWithoutAgentInput | AgentTaskUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentTaskCreateManyAgentInputEnvelope
    set?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    disconnect?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    delete?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    connect?: AgentTaskWhereUniqueInput | AgentTaskWhereUniqueInput[]
    update?: AgentTaskUpdateWithWhereUniqueWithoutAgentInput | AgentTaskUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentTaskUpdateManyWithWhereWithoutAgentInput | AgentTaskUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentTaskScalarWhereInput | AgentTaskScalarWhereInput[]
  }

  export type EnsSubdomainUncheckedUpdateOneWithoutAgentNestedInput = {
    create?: XOR<EnsSubdomainCreateWithoutAgentInput, EnsSubdomainUncheckedCreateWithoutAgentInput>
    connectOrCreate?: EnsSubdomainCreateOrConnectWithoutAgentInput
    upsert?: EnsSubdomainUpsertWithoutAgentInput
    disconnect?: EnsSubdomainWhereInput | boolean
    delete?: EnsSubdomainWhereInput | boolean
    connect?: EnsSubdomainWhereUniqueInput
    update?: XOR<XOR<EnsSubdomainUpdateToOneWithWhereWithoutAgentInput, EnsSubdomainUpdateWithoutAgentInput>, EnsSubdomainUncheckedUpdateWithoutAgentInput>
  }

  export type AgentCreateNestedOneWithoutChannelBindingsInput = {
    create?: XOR<AgentCreateWithoutChannelBindingsInput, AgentUncheckedCreateWithoutChannelBindingsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutChannelBindingsInput
    connect?: AgentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutChannelBindingsInput = {
    create?: XOR<UserCreateWithoutChannelBindingsInput, UserUncheckedCreateWithoutChannelBindingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChannelBindingsInput
    connect?: UserWhereUniqueInput
  }

  export type SessionMessageCreateNestedManyWithoutBindingInput = {
    create?: XOR<SessionMessageCreateWithoutBindingInput, SessionMessageUncheckedCreateWithoutBindingInput> | SessionMessageCreateWithoutBindingInput[] | SessionMessageUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: SessionMessageCreateOrConnectWithoutBindingInput | SessionMessageCreateOrConnectWithoutBindingInput[]
    createMany?: SessionMessageCreateManyBindingInputEnvelope
    connect?: SessionMessageWhereUniqueInput | SessionMessageWhereUniqueInput[]
  }

  export type SessionMessageUncheckedCreateNestedManyWithoutBindingInput = {
    create?: XOR<SessionMessageCreateWithoutBindingInput, SessionMessageUncheckedCreateWithoutBindingInput> | SessionMessageCreateWithoutBindingInput[] | SessionMessageUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: SessionMessageCreateOrConnectWithoutBindingInput | SessionMessageCreateOrConnectWithoutBindingInput[]
    createMany?: SessionMessageCreateManyBindingInputEnvelope
    connect?: SessionMessageWhereUniqueInput | SessionMessageWhereUniqueInput[]
  }

  export type AgentUpdateOneRequiredWithoutChannelBindingsNestedInput = {
    create?: XOR<AgentCreateWithoutChannelBindingsInput, AgentUncheckedCreateWithoutChannelBindingsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutChannelBindingsInput
    upsert?: AgentUpsertWithoutChannelBindingsInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutChannelBindingsInput, AgentUpdateWithoutChannelBindingsInput>, AgentUncheckedUpdateWithoutChannelBindingsInput>
  }

  export type UserUpdateOneWithoutChannelBindingsNestedInput = {
    create?: XOR<UserCreateWithoutChannelBindingsInput, UserUncheckedCreateWithoutChannelBindingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChannelBindingsInput
    upsert?: UserUpsertWithoutChannelBindingsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChannelBindingsInput, UserUpdateWithoutChannelBindingsInput>, UserUncheckedUpdateWithoutChannelBindingsInput>
  }

  export type SessionMessageUpdateManyWithoutBindingNestedInput = {
    create?: XOR<SessionMessageCreateWithoutBindingInput, SessionMessageUncheckedCreateWithoutBindingInput> | SessionMessageCreateWithoutBindingInput[] | SessionMessageUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: SessionMessageCreateOrConnectWithoutBindingInput | SessionMessageCreateOrConnectWithoutBindingInput[]
    upsert?: SessionMessageUpsertWithWhereUniqueWithoutBindingInput | SessionMessageUpsertWithWhereUniqueWithoutBindingInput[]
    createMany?: SessionMessageCreateManyBindingInputEnvelope
    set?: SessionMessageWhereUniqueInput | SessionMessageWhereUniqueInput[]
    disconnect?: SessionMessageWhereUniqueInput | SessionMessageWhereUniqueInput[]
    delete?: SessionMessageWhereUniqueInput | SessionMessageWhereUniqueInput[]
    connect?: SessionMessageWhereUniqueInput | SessionMessageWhereUniqueInput[]
    update?: SessionMessageUpdateWithWhereUniqueWithoutBindingInput | SessionMessageUpdateWithWhereUniqueWithoutBindingInput[]
    updateMany?: SessionMessageUpdateManyWithWhereWithoutBindingInput | SessionMessageUpdateManyWithWhereWithoutBindingInput[]
    deleteMany?: SessionMessageScalarWhereInput | SessionMessageScalarWhereInput[]
  }

  export type SessionMessageUncheckedUpdateManyWithoutBindingNestedInput = {
    create?: XOR<SessionMessageCreateWithoutBindingInput, SessionMessageUncheckedCreateWithoutBindingInput> | SessionMessageCreateWithoutBindingInput[] | SessionMessageUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: SessionMessageCreateOrConnectWithoutBindingInput | SessionMessageCreateOrConnectWithoutBindingInput[]
    upsert?: SessionMessageUpsertWithWhereUniqueWithoutBindingInput | SessionMessageUpsertWithWhereUniqueWithoutBindingInput[]
    createMany?: SessionMessageCreateManyBindingInputEnvelope
    set?: SessionMessageWhereUniqueInput | SessionMessageWhereUniqueInput[]
    disconnect?: SessionMessageWhereUniqueInput | SessionMessageWhereUniqueInput[]
    delete?: SessionMessageWhereUniqueInput | SessionMessageWhereUniqueInput[]
    connect?: SessionMessageWhereUniqueInput | SessionMessageWhereUniqueInput[]
    update?: SessionMessageUpdateWithWhereUniqueWithoutBindingInput | SessionMessageUpdateWithWhereUniqueWithoutBindingInput[]
    updateMany?: SessionMessageUpdateManyWithWhereWithoutBindingInput | SessionMessageUpdateManyWithWhereWithoutBindingInput[]
    deleteMany?: SessionMessageScalarWhereInput | SessionMessageScalarWhereInput[]
  }

  export type ChannelBindingCreateNestedOneWithoutSessionMessagesInput = {
    create?: XOR<ChannelBindingCreateWithoutSessionMessagesInput, ChannelBindingUncheckedCreateWithoutSessionMessagesInput>
    connectOrCreate?: ChannelBindingCreateOrConnectWithoutSessionMessagesInput
    connect?: ChannelBindingWhereUniqueInput
  }

  export type ChannelBindingUpdateOneRequiredWithoutSessionMessagesNestedInput = {
    create?: XOR<ChannelBindingCreateWithoutSessionMessagesInput, ChannelBindingUncheckedCreateWithoutSessionMessagesInput>
    connectOrCreate?: ChannelBindingCreateOrConnectWithoutSessionMessagesInput
    upsert?: ChannelBindingUpsertWithoutSessionMessagesInput
    connect?: ChannelBindingWhereUniqueInput
    update?: XOR<XOR<ChannelBindingUpdateToOneWithWhereWithoutSessionMessagesInput, ChannelBindingUpdateWithoutSessionMessagesInput>, ChannelBindingUncheckedUpdateWithoutSessionMessagesInput>
  }

  export type AgentCreateNestedOneWithoutVerificationInput = {
    create?: XOR<AgentCreateWithoutVerificationInput, AgentUncheckedCreateWithoutVerificationInput>
    connectOrCreate?: AgentCreateOrConnectWithoutVerificationInput
    connect?: AgentWhereUniqueInput
  }

  export type AgentUpdateOneRequiredWithoutVerificationNestedInput = {
    create?: XOR<AgentCreateWithoutVerificationInput, AgentUncheckedCreateWithoutVerificationInput>
    connectOrCreate?: AgentCreateOrConnectWithoutVerificationInput
    upsert?: AgentUpsertWithoutVerificationInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutVerificationInput, AgentUpdateWithoutVerificationInput>, AgentUncheckedUpdateWithoutVerificationInput>
  }

  export type AgentCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<AgentCreateWithoutTransactionsInput, AgentUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutTransactionsInput
    connect?: AgentWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AgentUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<AgentCreateWithoutTransactionsInput, AgentUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutTransactionsInput
    upsert?: AgentUpsertWithoutTransactionsInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutTransactionsInput, AgentUpdateWithoutTransactionsInput>, AgentUncheckedUpdateWithoutTransactionsInput>
  }

  export type AgentCreateNestedOneWithoutActivityLogsInput = {
    create?: XOR<AgentCreateWithoutActivityLogsInput, AgentUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutActivityLogsInput
    connect?: AgentWhereUniqueInput
  }

  export type AgentUpdateOneRequiredWithoutActivityLogsNestedInput = {
    create?: XOR<AgentCreateWithoutActivityLogsInput, AgentUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutActivityLogsInput
    upsert?: AgentUpsertWithoutActivityLogsInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutActivityLogsInput, AgentUpdateWithoutActivityLogsInput>, AgentUncheckedUpdateWithoutActivityLogsInput>
  }

  export type AgentCreateNestedOneWithoutAgentTasksInput = {
    create?: XOR<AgentCreateWithoutAgentTasksInput, AgentUncheckedCreateWithoutAgentTasksInput>
    connectOrCreate?: AgentCreateOrConnectWithoutAgentTasksInput
    connect?: AgentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAgentTasksInput = {
    create?: XOR<UserCreateWithoutAgentTasksInput, UserUncheckedCreateWithoutAgentTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgentTasksInput
    connect?: UserWhereUniqueInput
  }

  export type AgentUpdateOneRequiredWithoutAgentTasksNestedInput = {
    create?: XOR<AgentCreateWithoutAgentTasksInput, AgentUncheckedCreateWithoutAgentTasksInput>
    connectOrCreate?: AgentCreateOrConnectWithoutAgentTasksInput
    upsert?: AgentUpsertWithoutAgentTasksInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutAgentTasksInput, AgentUpdateWithoutAgentTasksInput>, AgentUncheckedUpdateWithoutAgentTasksInput>
  }

  export type UserUpdateOneRequiredWithoutAgentTasksNestedInput = {
    create?: XOR<UserCreateWithoutAgentTasksInput, UserUncheckedCreateWithoutAgentTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgentTasksInput
    upsert?: UserUpsertWithoutAgentTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAgentTasksInput, UserUpdateWithoutAgentTasksInput>, UserUncheckedUpdateWithoutAgentTasksInput>
  }

  export type AgentCreateNestedOneWithoutEnsRegistrationInput = {
    create?: XOR<AgentCreateWithoutEnsRegistrationInput, AgentUncheckedCreateWithoutEnsRegistrationInput>
    connectOrCreate?: AgentCreateOrConnectWithoutEnsRegistrationInput
    connect?: AgentWhereUniqueInput
  }

  export type AgentUpdateOneWithoutEnsRegistrationNestedInput = {
    create?: XOR<AgentCreateWithoutEnsRegistrationInput, AgentUncheckedCreateWithoutEnsRegistrationInput>
    connectOrCreate?: AgentCreateOrConnectWithoutEnsRegistrationInput
    upsert?: AgentUpsertWithoutEnsRegistrationInput
    disconnect?: AgentWhereInput | boolean
    delete?: AgentWhereInput | boolean
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutEnsRegistrationInput, AgentUpdateWithoutEnsRegistrationInput>, AgentUncheckedUpdateWithoutEnsRegistrationInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type AgentCreateWithoutOwnerInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    transactions?: TransactionCreateNestedManyWithoutAgentInput
    activityLogs?: ActivityLogCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationCreateNestedOneWithoutAgentInput
    agentTasks?: AgentTaskCreateNestedManyWithoutAgentInput
    ensRegistration?: EnsSubdomainCreateNestedOneWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutAgentInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingUncheckedCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationUncheckedCreateNestedOneWithoutAgentInput
    agentTasks?: AgentTaskUncheckedCreateNestedManyWithoutAgentInput
    ensRegistration?: EnsSubdomainUncheckedCreateNestedOneWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutOwnerInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutOwnerInput, AgentUncheckedCreateWithoutOwnerInput>
  }

  export type AgentCreateManyOwnerInputEnvelope = {
    data: AgentCreateManyOwnerInput | AgentCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type AgentTaskCreateWithoutUserInput = {
    id?: string
    triggerType: string
    tokenSymbol?: string | null
    conditionType?: string | null
    targetValue?: number | null
    baselinePrice?: number | null
    executeAt?: Date | string | null
    cronSchedule?: string | null
    lastExecutedAt?: Date | string | null
    actionType: string
    actionPayload: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutAgentTasksInput
  }

  export type AgentTaskUncheckedCreateWithoutUserInput = {
    id?: string
    agentId: string
    triggerType: string
    tokenSymbol?: string | null
    conditionType?: string | null
    targetValue?: number | null
    baselinePrice?: number | null
    executeAt?: Date | string | null
    cronSchedule?: string | null
    lastExecutedAt?: Date | string | null
    actionType: string
    actionPayload: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentTaskCreateOrConnectWithoutUserInput = {
    where: AgentTaskWhereUniqueInput
    create: XOR<AgentTaskCreateWithoutUserInput, AgentTaskUncheckedCreateWithoutUserInput>
  }

  export type AgentTaskCreateManyUserInputEnvelope = {
    data: AgentTaskCreateManyUserInput | AgentTaskCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChannelBindingCreateWithoutUserInput = {
    id?: string
    channelType: string
    senderIdentifier: string
    senderName?: string | null
    chatIdentifier?: string | null
    pairingCode?: string | null
    bindingType?: string
    isActive?: boolean
    pairedAt?: Date | string
    lastMessageAt?: Date | string
    agent: AgentCreateNestedOneWithoutChannelBindingsInput
    sessionMessages?: SessionMessageCreateNestedManyWithoutBindingInput
  }

  export type ChannelBindingUncheckedCreateWithoutUserInput = {
    id?: string
    agentId: string
    channelType: string
    senderIdentifier: string
    senderName?: string | null
    chatIdentifier?: string | null
    pairingCode?: string | null
    bindingType?: string
    isActive?: boolean
    pairedAt?: Date | string
    lastMessageAt?: Date | string
    sessionMessages?: SessionMessageUncheckedCreateNestedManyWithoutBindingInput
  }

  export type ChannelBindingCreateOrConnectWithoutUserInput = {
    where: ChannelBindingWhereUniqueInput
    create: XOR<ChannelBindingCreateWithoutUserInput, ChannelBindingUncheckedCreateWithoutUserInput>
  }

  export type ChannelBindingCreateManyUserInputEnvelope = {
    data: ChannelBindingCreateManyUserInput | ChannelBindingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AgentUpsertWithWhereUniqueWithoutOwnerInput = {
    where: AgentWhereUniqueInput
    update: XOR<AgentUpdateWithoutOwnerInput, AgentUncheckedUpdateWithoutOwnerInput>
    create: XOR<AgentCreateWithoutOwnerInput, AgentUncheckedCreateWithoutOwnerInput>
  }

  export type AgentUpdateWithWhereUniqueWithoutOwnerInput = {
    where: AgentWhereUniqueInput
    data: XOR<AgentUpdateWithoutOwnerInput, AgentUncheckedUpdateWithoutOwnerInput>
  }

  export type AgentUpdateManyWithWhereWithoutOwnerInput = {
    where: AgentScalarWhereInput
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyWithoutOwnerInput>
  }

  export type AgentScalarWhereInput = {
    AND?: AgentScalarWhereInput | AgentScalarWhereInput[]
    OR?: AgentScalarWhereInput[]
    NOT?: AgentScalarWhereInput | AgentScalarWhereInput[]
    id?: StringFilter<"Agent"> | string
    name?: StringFilter<"Agent"> | string
    description?: StringNullableFilter<"Agent"> | string | null
    templateType?: StringFilter<"Agent"> | string
    status?: StringFilter<"Agent"> | string
    systemPrompt?: StringNullableFilter<"Agent"> | string | null
    llmProvider?: StringFilter<"Agent"> | string
    llmModel?: StringFilter<"Agent"> | string
    spendingLimit?: FloatFilter<"Agent"> | number
    spendingUsed?: FloatFilter<"Agent"> | number
    agentWalletAddress?: StringNullableFilter<"Agent"> | string | null
    walletDerivationIndex?: IntNullableFilter<"Agent"> | number | null
    walletType?: StringNullableFilter<"Agent"> | string | null
    sessionKeyAddress?: StringNullableFilter<"Agent"> | string | null
    sessionKeyPrivateKey?: StringNullableFilter<"Agent"> | string | null
    sessionContext?: StringNullableFilter<"Agent"> | string | null
    sessionExpiresAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    sessionPermissions?: StringNullableFilter<"Agent"> | string | null
    telegramBotToken?: StringNullableFilter<"Agent"> | string | null
    telegramChatIds?: StringNullableFilter<"Agent"> | string | null
    discordBotToken?: StringNullableFilter<"Agent"> | string | null
    webhookSecret?: StringNullableFilter<"Agent"> | string | null
    disabledSkills?: StringNullableFilter<"Agent"> | string | null
    externalSocials?: StringNullableFilter<"Agent"> | string | null
    channels?: StringNullableFilter<"Agent"> | string | null
    cronJobs?: StringNullableFilter<"Agent"> | string | null
    pairingCode?: StringNullableFilter<"Agent"> | string | null
    pairingCodeExpiresAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    openclawAgentId?: StringNullableFilter<"Agent"> | string | null
    imageUrl?: StringNullableFilter<"Agent"> | string | null
    imageSlug?: StringNullableFilter<"Agent"> | string | null
    imageDataBase64?: StringNullableFilter<"Agent"> | string | null
    erc8004AgentId?: StringNullableFilter<"Agent"> | string | null
    erc8004URI?: StringNullableFilter<"Agent"> | string | null
    erc8004TxHash?: StringNullableFilter<"Agent"> | string | null
    erc8004ChainId?: IntNullableFilter<"Agent"> | number | null
    reputationScore?: FloatFilter<"Agent"> | number
    exported?: BoolFilter<"Agent"> | boolean
    exportedAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    configuration?: StringNullableFilter<"Agent"> | string | null
    ensSubdomain?: StringNullableFilter<"Agent"> | string | null
    ensNode?: StringNullableFilter<"Agent"> | string | null
    ensRegisteredAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    agentDeployedTokens?: StringNullableFilter<"Agent"> | string | null
    ownerId?: StringFilter<"Agent"> | string
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    deployedAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
  }

  export type AgentTaskUpsertWithWhereUniqueWithoutUserInput = {
    where: AgentTaskWhereUniqueInput
    update: XOR<AgentTaskUpdateWithoutUserInput, AgentTaskUncheckedUpdateWithoutUserInput>
    create: XOR<AgentTaskCreateWithoutUserInput, AgentTaskUncheckedCreateWithoutUserInput>
  }

  export type AgentTaskUpdateWithWhereUniqueWithoutUserInput = {
    where: AgentTaskWhereUniqueInput
    data: XOR<AgentTaskUpdateWithoutUserInput, AgentTaskUncheckedUpdateWithoutUserInput>
  }

  export type AgentTaskUpdateManyWithWhereWithoutUserInput = {
    where: AgentTaskScalarWhereInput
    data: XOR<AgentTaskUpdateManyMutationInput, AgentTaskUncheckedUpdateManyWithoutUserInput>
  }

  export type AgentTaskScalarWhereInput = {
    AND?: AgentTaskScalarWhereInput | AgentTaskScalarWhereInput[]
    OR?: AgentTaskScalarWhereInput[]
    NOT?: AgentTaskScalarWhereInput | AgentTaskScalarWhereInput[]
    id?: StringFilter<"AgentTask"> | string
    agentId?: StringFilter<"AgentTask"> | string
    userId?: StringFilter<"AgentTask"> | string
    triggerType?: StringFilter<"AgentTask"> | string
    tokenSymbol?: StringNullableFilter<"AgentTask"> | string | null
    conditionType?: StringNullableFilter<"AgentTask"> | string | null
    targetValue?: FloatNullableFilter<"AgentTask"> | number | null
    baselinePrice?: FloatNullableFilter<"AgentTask"> | number | null
    executeAt?: DateTimeNullableFilter<"AgentTask"> | Date | string | null
    cronSchedule?: StringNullableFilter<"AgentTask"> | string | null
    lastExecutedAt?: DateTimeNullableFilter<"AgentTask"> | Date | string | null
    actionType?: StringFilter<"AgentTask"> | string
    actionPayload?: StringFilter<"AgentTask"> | string
    status?: StringFilter<"AgentTask"> | string
    createdAt?: DateTimeFilter<"AgentTask"> | Date | string
    updatedAt?: DateTimeFilter<"AgentTask"> | Date | string
  }

  export type ChannelBindingUpsertWithWhereUniqueWithoutUserInput = {
    where: ChannelBindingWhereUniqueInput
    update: XOR<ChannelBindingUpdateWithoutUserInput, ChannelBindingUncheckedUpdateWithoutUserInput>
    create: XOR<ChannelBindingCreateWithoutUserInput, ChannelBindingUncheckedCreateWithoutUserInput>
  }

  export type ChannelBindingUpdateWithWhereUniqueWithoutUserInput = {
    where: ChannelBindingWhereUniqueInput
    data: XOR<ChannelBindingUpdateWithoutUserInput, ChannelBindingUncheckedUpdateWithoutUserInput>
  }

  export type ChannelBindingUpdateManyWithWhereWithoutUserInput = {
    where: ChannelBindingScalarWhereInput
    data: XOR<ChannelBindingUpdateManyMutationInput, ChannelBindingUncheckedUpdateManyWithoutUserInput>
  }

  export type ChannelBindingScalarWhereInput = {
    AND?: ChannelBindingScalarWhereInput | ChannelBindingScalarWhereInput[]
    OR?: ChannelBindingScalarWhereInput[]
    NOT?: ChannelBindingScalarWhereInput | ChannelBindingScalarWhereInput[]
    id?: StringFilter<"ChannelBinding"> | string
    agentId?: StringFilter<"ChannelBinding"> | string
    userId?: StringNullableFilter<"ChannelBinding"> | string | null
    channelType?: StringFilter<"ChannelBinding"> | string
    senderIdentifier?: StringFilter<"ChannelBinding"> | string
    senderName?: StringNullableFilter<"ChannelBinding"> | string | null
    chatIdentifier?: StringNullableFilter<"ChannelBinding"> | string | null
    pairingCode?: StringNullableFilter<"ChannelBinding"> | string | null
    bindingType?: StringFilter<"ChannelBinding"> | string
    isActive?: BoolFilter<"ChannelBinding"> | boolean
    pairedAt?: DateTimeFilter<"ChannelBinding"> | Date | string
    lastMessageAt?: DateTimeFilter<"ChannelBinding"> | Date | string
  }

  export type UserCreateWithoutAgentsInput = {
    id?: string
    email?: string | null
    walletAddress: string
    walletDerivationIndex?: number | null
    openrouterApiKey?: string | null
    openaiApiKey?: string | null
    groqApiKey?: string | null
    grokApiKey?: string | null
    geminiApiKey?: string | null
    deepseekApiKey?: string | null
    zaiApiKey?: string | null
    anthropicApiKey?: string | null
    telegramId?: string | null
    telegramUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agentTasks?: AgentTaskCreateNestedManyWithoutUserInput
    channelBindings?: ChannelBindingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAgentsInput = {
    id?: string
    email?: string | null
    walletAddress: string
    walletDerivationIndex?: number | null
    openrouterApiKey?: string | null
    openaiApiKey?: string | null
    groqApiKey?: string | null
    grokApiKey?: string | null
    geminiApiKey?: string | null
    deepseekApiKey?: string | null
    zaiApiKey?: string | null
    anthropicApiKey?: string | null
    telegramId?: string | null
    telegramUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agentTasks?: AgentTaskUncheckedCreateNestedManyWithoutUserInput
    channelBindings?: ChannelBindingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAgentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAgentsInput, UserUncheckedCreateWithoutAgentsInput>
  }

  export type TransactionCreateWithoutAgentInput = {
    id?: string
    txHash?: string | null
    type: string
    status?: string
    fromAddress?: string | null
    toAddress?: string | null
    amount?: number | null
    currency?: string | null
    gasUsed?: number | null
    blockNumber?: number | null
    description?: string | null
    createdAt?: Date | string
  }

  export type TransactionUncheckedCreateWithoutAgentInput = {
    id?: string
    txHash?: string | null
    type: string
    status?: string
    fromAddress?: string | null
    toAddress?: string | null
    amount?: number | null
    currency?: string | null
    gasUsed?: number | null
    blockNumber?: number | null
    description?: string | null
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutAgentInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutAgentInput, TransactionUncheckedCreateWithoutAgentInput>
  }

  export type TransactionCreateManyAgentInputEnvelope = {
    data: TransactionCreateManyAgentInput | TransactionCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type ActivityLogCreateWithoutAgentInput = {
    id?: string
    type: string
    message: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUncheckedCreateWithoutAgentInput = {
    id?: string
    type: string
    message: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogCreateOrConnectWithoutAgentInput = {
    where: ActivityLogWhereUniqueInput
    create: XOR<ActivityLogCreateWithoutAgentInput, ActivityLogUncheckedCreateWithoutAgentInput>
  }

  export type ActivityLogCreateManyAgentInputEnvelope = {
    data: ActivityLogCreateManyAgentInput | ActivityLogCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type ChannelBindingCreateWithoutAgentInput = {
    id?: string
    channelType: string
    senderIdentifier: string
    senderName?: string | null
    chatIdentifier?: string | null
    pairingCode?: string | null
    bindingType?: string
    isActive?: boolean
    pairedAt?: Date | string
    lastMessageAt?: Date | string
    user?: UserCreateNestedOneWithoutChannelBindingsInput
    sessionMessages?: SessionMessageCreateNestedManyWithoutBindingInput
  }

  export type ChannelBindingUncheckedCreateWithoutAgentInput = {
    id?: string
    userId?: string | null
    channelType: string
    senderIdentifier: string
    senderName?: string | null
    chatIdentifier?: string | null
    pairingCode?: string | null
    bindingType?: string
    isActive?: boolean
    pairedAt?: Date | string
    lastMessageAt?: Date | string
    sessionMessages?: SessionMessageUncheckedCreateNestedManyWithoutBindingInput
  }

  export type ChannelBindingCreateOrConnectWithoutAgentInput = {
    where: ChannelBindingWhereUniqueInput
    create: XOR<ChannelBindingCreateWithoutAgentInput, ChannelBindingUncheckedCreateWithoutAgentInput>
  }

  export type ChannelBindingCreateManyAgentInputEnvelope = {
    data: ChannelBindingCreateManyAgentInput | ChannelBindingCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type AgentVerificationCreateWithoutAgentInput = {
    id?: string
    publicKey: string
    encryptedPrivateKey: string
    status?: string
    sessionId?: string | null
    challenge?: string | null
    humanId?: string | null
    agentKeyHash?: string | null
    agentName?: string | null
    swarmUrl?: string | null
    selfxyzVerified?: boolean
    selfxyzRegisteredAt?: Date | string | null
    selfAppConfig?: string | null
    encryptedSelfclawApiKey?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentVerificationUncheckedCreateWithoutAgentInput = {
    id?: string
    publicKey: string
    encryptedPrivateKey: string
    status?: string
    sessionId?: string | null
    challenge?: string | null
    humanId?: string | null
    agentKeyHash?: string | null
    agentName?: string | null
    swarmUrl?: string | null
    selfxyzVerified?: boolean
    selfxyzRegisteredAt?: Date | string | null
    selfAppConfig?: string | null
    encryptedSelfclawApiKey?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentVerificationCreateOrConnectWithoutAgentInput = {
    where: AgentVerificationWhereUniqueInput
    create: XOR<AgentVerificationCreateWithoutAgentInput, AgentVerificationUncheckedCreateWithoutAgentInput>
  }

  export type AgentTaskCreateWithoutAgentInput = {
    id?: string
    triggerType: string
    tokenSymbol?: string | null
    conditionType?: string | null
    targetValue?: number | null
    baselinePrice?: number | null
    executeAt?: Date | string | null
    cronSchedule?: string | null
    lastExecutedAt?: Date | string | null
    actionType: string
    actionPayload: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAgentTasksInput
  }

  export type AgentTaskUncheckedCreateWithoutAgentInput = {
    id?: string
    userId: string
    triggerType: string
    tokenSymbol?: string | null
    conditionType?: string | null
    targetValue?: number | null
    baselinePrice?: number | null
    executeAt?: Date | string | null
    cronSchedule?: string | null
    lastExecutedAt?: Date | string | null
    actionType: string
    actionPayload: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentTaskCreateOrConnectWithoutAgentInput = {
    where: AgentTaskWhereUniqueInput
    create: XOR<AgentTaskCreateWithoutAgentInput, AgentTaskUncheckedCreateWithoutAgentInput>
  }

  export type AgentTaskCreateManyAgentInputEnvelope = {
    data: AgentTaskCreateManyAgentInput | AgentTaskCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type EnsSubdomainCreateWithoutAgentInput = {
    id?: string
    name: string
    fullName: string
    node: string
    ownerAddress: string
    isAgentOwned?: boolean
    registeredAt?: Date | string
    updatedAt?: Date | string
    txHash?: string | null
  }

  export type EnsSubdomainUncheckedCreateWithoutAgentInput = {
    id?: string
    name: string
    fullName: string
    node: string
    ownerAddress: string
    isAgentOwned?: boolean
    registeredAt?: Date | string
    updatedAt?: Date | string
    txHash?: string | null
  }

  export type EnsSubdomainCreateOrConnectWithoutAgentInput = {
    where: EnsSubdomainWhereUniqueInput
    create: XOR<EnsSubdomainCreateWithoutAgentInput, EnsSubdomainUncheckedCreateWithoutAgentInput>
  }

  export type UserUpsertWithoutAgentsInput = {
    update: XOR<UserUpdateWithoutAgentsInput, UserUncheckedUpdateWithoutAgentsInput>
    create: XOR<UserCreateWithoutAgentsInput, UserUncheckedCreateWithoutAgentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAgentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAgentsInput, UserUncheckedUpdateWithoutAgentsInput>
  }

  export type UserUpdateWithoutAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    openrouterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    openaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    groqApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    grokApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    deepseekApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    anthropicApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agentTasks?: AgentTaskUpdateManyWithoutUserNestedInput
    channelBindings?: ChannelBindingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    openrouterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    openaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    groqApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    grokApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    deepseekApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    anthropicApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agentTasks?: AgentTaskUncheckedUpdateManyWithoutUserNestedInput
    channelBindings?: ChannelBindingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutAgentInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutAgentInput, TransactionUncheckedUpdateWithoutAgentInput>
    create: XOR<TransactionCreateWithoutAgentInput, TransactionUncheckedCreateWithoutAgentInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutAgentInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutAgentInput, TransactionUncheckedUpdateWithoutAgentInput>
  }

  export type TransactionUpdateManyWithWhereWithoutAgentInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutAgentInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    agentId?: StringFilter<"Transaction"> | string
    txHash?: StringNullableFilter<"Transaction"> | string | null
    type?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    fromAddress?: StringNullableFilter<"Transaction"> | string | null
    toAddress?: StringNullableFilter<"Transaction"> | string | null
    amount?: FloatNullableFilter<"Transaction"> | number | null
    currency?: StringNullableFilter<"Transaction"> | string | null
    gasUsed?: FloatNullableFilter<"Transaction"> | number | null
    blockNumber?: IntNullableFilter<"Transaction"> | number | null
    description?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type ActivityLogUpsertWithWhereUniqueWithoutAgentInput = {
    where: ActivityLogWhereUniqueInput
    update: XOR<ActivityLogUpdateWithoutAgentInput, ActivityLogUncheckedUpdateWithoutAgentInput>
    create: XOR<ActivityLogCreateWithoutAgentInput, ActivityLogUncheckedCreateWithoutAgentInput>
  }

  export type ActivityLogUpdateWithWhereUniqueWithoutAgentInput = {
    where: ActivityLogWhereUniqueInput
    data: XOR<ActivityLogUpdateWithoutAgentInput, ActivityLogUncheckedUpdateWithoutAgentInput>
  }

  export type ActivityLogUpdateManyWithWhereWithoutAgentInput = {
    where: ActivityLogScalarWhereInput
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyWithoutAgentInput>
  }

  export type ActivityLogScalarWhereInput = {
    AND?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    OR?: ActivityLogScalarWhereInput[]
    NOT?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    agentId?: StringFilter<"ActivityLog"> | string
    type?: StringFilter<"ActivityLog"> | string
    message?: StringFilter<"ActivityLog"> | string
    metadata?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }

  export type ChannelBindingUpsertWithWhereUniqueWithoutAgentInput = {
    where: ChannelBindingWhereUniqueInput
    update: XOR<ChannelBindingUpdateWithoutAgentInput, ChannelBindingUncheckedUpdateWithoutAgentInput>
    create: XOR<ChannelBindingCreateWithoutAgentInput, ChannelBindingUncheckedCreateWithoutAgentInput>
  }

  export type ChannelBindingUpdateWithWhereUniqueWithoutAgentInput = {
    where: ChannelBindingWhereUniqueInput
    data: XOR<ChannelBindingUpdateWithoutAgentInput, ChannelBindingUncheckedUpdateWithoutAgentInput>
  }

  export type ChannelBindingUpdateManyWithWhereWithoutAgentInput = {
    where: ChannelBindingScalarWhereInput
    data: XOR<ChannelBindingUpdateManyMutationInput, ChannelBindingUncheckedUpdateManyWithoutAgentInput>
  }

  export type AgentVerificationUpsertWithoutAgentInput = {
    update: XOR<AgentVerificationUpdateWithoutAgentInput, AgentVerificationUncheckedUpdateWithoutAgentInput>
    create: XOR<AgentVerificationCreateWithoutAgentInput, AgentVerificationUncheckedCreateWithoutAgentInput>
    where?: AgentVerificationWhereInput
  }

  export type AgentVerificationUpdateToOneWithWhereWithoutAgentInput = {
    where?: AgentVerificationWhereInput
    data: XOR<AgentVerificationUpdateWithoutAgentInput, AgentVerificationUncheckedUpdateWithoutAgentInput>
  }

  export type AgentVerificationUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    humanId?: NullableStringFieldUpdateOperationsInput | string | null
    agentKeyHash?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    swarmUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfxyzVerified?: BoolFieldUpdateOperationsInput | boolean
    selfxyzRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selfAppConfig?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedSelfclawApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentVerificationUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    humanId?: NullableStringFieldUpdateOperationsInput | string | null
    agentKeyHash?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    swarmUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfxyzVerified?: BoolFieldUpdateOperationsInput | boolean
    selfxyzRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selfAppConfig?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedSelfclawApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentTaskUpsertWithWhereUniqueWithoutAgentInput = {
    where: AgentTaskWhereUniqueInput
    update: XOR<AgentTaskUpdateWithoutAgentInput, AgentTaskUncheckedUpdateWithoutAgentInput>
    create: XOR<AgentTaskCreateWithoutAgentInput, AgentTaskUncheckedCreateWithoutAgentInput>
  }

  export type AgentTaskUpdateWithWhereUniqueWithoutAgentInput = {
    where: AgentTaskWhereUniqueInput
    data: XOR<AgentTaskUpdateWithoutAgentInput, AgentTaskUncheckedUpdateWithoutAgentInput>
  }

  export type AgentTaskUpdateManyWithWhereWithoutAgentInput = {
    where: AgentTaskScalarWhereInput
    data: XOR<AgentTaskUpdateManyMutationInput, AgentTaskUncheckedUpdateManyWithoutAgentInput>
  }

  export type EnsSubdomainUpsertWithoutAgentInput = {
    update: XOR<EnsSubdomainUpdateWithoutAgentInput, EnsSubdomainUncheckedUpdateWithoutAgentInput>
    create: XOR<EnsSubdomainCreateWithoutAgentInput, EnsSubdomainUncheckedCreateWithoutAgentInput>
    where?: EnsSubdomainWhereInput
  }

  export type EnsSubdomainUpdateToOneWithWhereWithoutAgentInput = {
    where?: EnsSubdomainWhereInput
    data: XOR<EnsSubdomainUpdateWithoutAgentInput, EnsSubdomainUncheckedUpdateWithoutAgentInput>
  }

  export type EnsSubdomainUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    node?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    isAgentOwned?: BoolFieldUpdateOperationsInput | boolean
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnsSubdomainUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    node?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    isAgentOwned?: BoolFieldUpdateOperationsInput | boolean
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgentCreateWithoutChannelBindingsInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutAgentsInput
    transactions?: TransactionCreateNestedManyWithoutAgentInput
    activityLogs?: ActivityLogCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationCreateNestedOneWithoutAgentInput
    agentTasks?: AgentTaskCreateNestedManyWithoutAgentInput
    ensRegistration?: EnsSubdomainCreateNestedOneWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutChannelBindingsInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutAgentInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationUncheckedCreateNestedOneWithoutAgentInput
    agentTasks?: AgentTaskUncheckedCreateNestedManyWithoutAgentInput
    ensRegistration?: EnsSubdomainUncheckedCreateNestedOneWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutChannelBindingsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutChannelBindingsInput, AgentUncheckedCreateWithoutChannelBindingsInput>
  }

  export type UserCreateWithoutChannelBindingsInput = {
    id?: string
    email?: string | null
    walletAddress: string
    walletDerivationIndex?: number | null
    openrouterApiKey?: string | null
    openaiApiKey?: string | null
    groqApiKey?: string | null
    grokApiKey?: string | null
    geminiApiKey?: string | null
    deepseekApiKey?: string | null
    zaiApiKey?: string | null
    anthropicApiKey?: string | null
    telegramId?: string | null
    telegramUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agents?: AgentCreateNestedManyWithoutOwnerInput
    agentTasks?: AgentTaskCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutChannelBindingsInput = {
    id?: string
    email?: string | null
    walletAddress: string
    walletDerivationIndex?: number | null
    openrouterApiKey?: string | null
    openaiApiKey?: string | null
    groqApiKey?: string | null
    grokApiKey?: string | null
    geminiApiKey?: string | null
    deepseekApiKey?: string | null
    zaiApiKey?: string | null
    anthropicApiKey?: string | null
    telegramId?: string | null
    telegramUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agents?: AgentUncheckedCreateNestedManyWithoutOwnerInput
    agentTasks?: AgentTaskUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutChannelBindingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChannelBindingsInput, UserUncheckedCreateWithoutChannelBindingsInput>
  }

  export type SessionMessageCreateWithoutBindingInput = {
    id?: string
    role: string
    content: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type SessionMessageUncheckedCreateWithoutBindingInput = {
    id?: string
    role: string
    content: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type SessionMessageCreateOrConnectWithoutBindingInput = {
    where: SessionMessageWhereUniqueInput
    create: XOR<SessionMessageCreateWithoutBindingInput, SessionMessageUncheckedCreateWithoutBindingInput>
  }

  export type SessionMessageCreateManyBindingInputEnvelope = {
    data: SessionMessageCreateManyBindingInput | SessionMessageCreateManyBindingInput[]
    skipDuplicates?: boolean
  }

  export type AgentUpsertWithoutChannelBindingsInput = {
    update: XOR<AgentUpdateWithoutChannelBindingsInput, AgentUncheckedUpdateWithoutChannelBindingsInput>
    create: XOR<AgentCreateWithoutChannelBindingsInput, AgentUncheckedCreateWithoutChannelBindingsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutChannelBindingsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutChannelBindingsInput, AgentUncheckedUpdateWithoutChannelBindingsInput>
  }

  export type AgentUpdateWithoutChannelBindingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutAgentsNestedInput
    transactions?: TransactionUpdateManyWithoutAgentNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUpdateOneWithoutAgentNestedInput
    agentTasks?: AgentTaskUpdateManyWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUpdateOneWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutChannelBindingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutAgentNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUncheckedUpdateOneWithoutAgentNestedInput
    agentTasks?: AgentTaskUncheckedUpdateManyWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUncheckedUpdateOneWithoutAgentNestedInput
  }

  export type UserUpsertWithoutChannelBindingsInput = {
    update: XOR<UserUpdateWithoutChannelBindingsInput, UserUncheckedUpdateWithoutChannelBindingsInput>
    create: XOR<UserCreateWithoutChannelBindingsInput, UserUncheckedCreateWithoutChannelBindingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChannelBindingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChannelBindingsInput, UserUncheckedUpdateWithoutChannelBindingsInput>
  }

  export type UserUpdateWithoutChannelBindingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    openrouterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    openaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    groqApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    grokApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    deepseekApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    anthropicApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agents?: AgentUpdateManyWithoutOwnerNestedInput
    agentTasks?: AgentTaskUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutChannelBindingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    openrouterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    openaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    groqApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    grokApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    deepseekApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    anthropicApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agents?: AgentUncheckedUpdateManyWithoutOwnerNestedInput
    agentTasks?: AgentTaskUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SessionMessageUpsertWithWhereUniqueWithoutBindingInput = {
    where: SessionMessageWhereUniqueInput
    update: XOR<SessionMessageUpdateWithoutBindingInput, SessionMessageUncheckedUpdateWithoutBindingInput>
    create: XOR<SessionMessageCreateWithoutBindingInput, SessionMessageUncheckedCreateWithoutBindingInput>
  }

  export type SessionMessageUpdateWithWhereUniqueWithoutBindingInput = {
    where: SessionMessageWhereUniqueInput
    data: XOR<SessionMessageUpdateWithoutBindingInput, SessionMessageUncheckedUpdateWithoutBindingInput>
  }

  export type SessionMessageUpdateManyWithWhereWithoutBindingInput = {
    where: SessionMessageScalarWhereInput
    data: XOR<SessionMessageUpdateManyMutationInput, SessionMessageUncheckedUpdateManyWithoutBindingInput>
  }

  export type SessionMessageScalarWhereInput = {
    AND?: SessionMessageScalarWhereInput | SessionMessageScalarWhereInput[]
    OR?: SessionMessageScalarWhereInput[]
    NOT?: SessionMessageScalarWhereInput | SessionMessageScalarWhereInput[]
    id?: StringFilter<"SessionMessage"> | string
    bindingId?: StringFilter<"SessionMessage"> | string
    role?: StringFilter<"SessionMessage"> | string
    content?: StringFilter<"SessionMessage"> | string
    metadata?: StringNullableFilter<"SessionMessage"> | string | null
    createdAt?: DateTimeFilter<"SessionMessage"> | Date | string
  }

  export type ChannelBindingCreateWithoutSessionMessagesInput = {
    id?: string
    channelType: string
    senderIdentifier: string
    senderName?: string | null
    chatIdentifier?: string | null
    pairingCode?: string | null
    bindingType?: string
    isActive?: boolean
    pairedAt?: Date | string
    lastMessageAt?: Date | string
    agent: AgentCreateNestedOneWithoutChannelBindingsInput
    user?: UserCreateNestedOneWithoutChannelBindingsInput
  }

  export type ChannelBindingUncheckedCreateWithoutSessionMessagesInput = {
    id?: string
    agentId: string
    userId?: string | null
    channelType: string
    senderIdentifier: string
    senderName?: string | null
    chatIdentifier?: string | null
    pairingCode?: string | null
    bindingType?: string
    isActive?: boolean
    pairedAt?: Date | string
    lastMessageAt?: Date | string
  }

  export type ChannelBindingCreateOrConnectWithoutSessionMessagesInput = {
    where: ChannelBindingWhereUniqueInput
    create: XOR<ChannelBindingCreateWithoutSessionMessagesInput, ChannelBindingUncheckedCreateWithoutSessionMessagesInput>
  }

  export type ChannelBindingUpsertWithoutSessionMessagesInput = {
    update: XOR<ChannelBindingUpdateWithoutSessionMessagesInput, ChannelBindingUncheckedUpdateWithoutSessionMessagesInput>
    create: XOR<ChannelBindingCreateWithoutSessionMessagesInput, ChannelBindingUncheckedCreateWithoutSessionMessagesInput>
    where?: ChannelBindingWhereInput
  }

  export type ChannelBindingUpdateToOneWithWhereWithoutSessionMessagesInput = {
    where?: ChannelBindingWhereInput
    data: XOR<ChannelBindingUpdateWithoutSessionMessagesInput, ChannelBindingUncheckedUpdateWithoutSessionMessagesInput>
  }

  export type ChannelBindingUpdateWithoutSessionMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelType?: StringFieldUpdateOperationsInput | string
    senderIdentifier?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    chatIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    bindingType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pairedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutChannelBindingsNestedInput
    user?: UserUpdateOneWithoutChannelBindingsNestedInput
  }

  export type ChannelBindingUncheckedUpdateWithoutSessionMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    channelType?: StringFieldUpdateOperationsInput | string
    senderIdentifier?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    chatIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    bindingType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pairedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentCreateWithoutVerificationInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutAgentsInput
    transactions?: TransactionCreateNestedManyWithoutAgentInput
    activityLogs?: ActivityLogCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingCreateNestedManyWithoutAgentInput
    agentTasks?: AgentTaskCreateNestedManyWithoutAgentInput
    ensRegistration?: EnsSubdomainCreateNestedOneWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutVerificationInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutAgentInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingUncheckedCreateNestedManyWithoutAgentInput
    agentTasks?: AgentTaskUncheckedCreateNestedManyWithoutAgentInput
    ensRegistration?: EnsSubdomainUncheckedCreateNestedOneWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutVerificationInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutVerificationInput, AgentUncheckedCreateWithoutVerificationInput>
  }

  export type AgentUpsertWithoutVerificationInput = {
    update: XOR<AgentUpdateWithoutVerificationInput, AgentUncheckedUpdateWithoutVerificationInput>
    create: XOR<AgentCreateWithoutVerificationInput, AgentUncheckedCreateWithoutVerificationInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutVerificationInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutVerificationInput, AgentUncheckedUpdateWithoutVerificationInput>
  }

  export type AgentUpdateWithoutVerificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutAgentsNestedInput
    transactions?: TransactionUpdateManyWithoutAgentNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUpdateManyWithoutAgentNestedInput
    agentTasks?: AgentTaskUpdateManyWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUpdateOneWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutVerificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutAgentNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUncheckedUpdateManyWithoutAgentNestedInput
    agentTasks?: AgentTaskUncheckedUpdateManyWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUncheckedUpdateOneWithoutAgentNestedInput
  }

  export type AgentCreateWithoutTransactionsInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutAgentsInput
    activityLogs?: ActivityLogCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationCreateNestedOneWithoutAgentInput
    agentTasks?: AgentTaskCreateNestedManyWithoutAgentInput
    ensRegistration?: EnsSubdomainCreateNestedOneWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingUncheckedCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationUncheckedCreateNestedOneWithoutAgentInput
    agentTasks?: AgentTaskUncheckedCreateNestedManyWithoutAgentInput
    ensRegistration?: EnsSubdomainUncheckedCreateNestedOneWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutTransactionsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutTransactionsInput, AgentUncheckedCreateWithoutTransactionsInput>
  }

  export type AgentUpsertWithoutTransactionsInput = {
    update: XOR<AgentUpdateWithoutTransactionsInput, AgentUncheckedUpdateWithoutTransactionsInput>
    create: XOR<AgentCreateWithoutTransactionsInput, AgentUncheckedCreateWithoutTransactionsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutTransactionsInput, AgentUncheckedUpdateWithoutTransactionsInput>
  }

  export type AgentUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutAgentsNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUpdateOneWithoutAgentNestedInput
    agentTasks?: AgentTaskUpdateManyWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUpdateOneWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUncheckedUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUncheckedUpdateOneWithoutAgentNestedInput
    agentTasks?: AgentTaskUncheckedUpdateManyWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUncheckedUpdateOneWithoutAgentNestedInput
  }

  export type AgentCreateWithoutActivityLogsInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutAgentsInput
    transactions?: TransactionCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationCreateNestedOneWithoutAgentInput
    agentTasks?: AgentTaskCreateNestedManyWithoutAgentInput
    ensRegistration?: EnsSubdomainCreateNestedOneWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutActivityLogsInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingUncheckedCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationUncheckedCreateNestedOneWithoutAgentInput
    agentTasks?: AgentTaskUncheckedCreateNestedManyWithoutAgentInput
    ensRegistration?: EnsSubdomainUncheckedCreateNestedOneWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutActivityLogsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutActivityLogsInput, AgentUncheckedCreateWithoutActivityLogsInput>
  }

  export type AgentUpsertWithoutActivityLogsInput = {
    update: XOR<AgentUpdateWithoutActivityLogsInput, AgentUncheckedUpdateWithoutActivityLogsInput>
    create: XOR<AgentCreateWithoutActivityLogsInput, AgentUncheckedCreateWithoutActivityLogsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutActivityLogsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutActivityLogsInput, AgentUncheckedUpdateWithoutActivityLogsInput>
  }

  export type AgentUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutAgentsNestedInput
    transactions?: TransactionUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUpdateOneWithoutAgentNestedInput
    agentTasks?: AgentTaskUpdateManyWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUpdateOneWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUncheckedUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUncheckedUpdateOneWithoutAgentNestedInput
    agentTasks?: AgentTaskUncheckedUpdateManyWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUncheckedUpdateOneWithoutAgentNestedInput
  }

  export type AgentCreateWithoutAgentTasksInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutAgentsInput
    transactions?: TransactionCreateNestedManyWithoutAgentInput
    activityLogs?: ActivityLogCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationCreateNestedOneWithoutAgentInput
    ensRegistration?: EnsSubdomainCreateNestedOneWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutAgentTasksInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutAgentInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingUncheckedCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationUncheckedCreateNestedOneWithoutAgentInput
    ensRegistration?: EnsSubdomainUncheckedCreateNestedOneWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutAgentTasksInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutAgentTasksInput, AgentUncheckedCreateWithoutAgentTasksInput>
  }

  export type UserCreateWithoutAgentTasksInput = {
    id?: string
    email?: string | null
    walletAddress: string
    walletDerivationIndex?: number | null
    openrouterApiKey?: string | null
    openaiApiKey?: string | null
    groqApiKey?: string | null
    grokApiKey?: string | null
    geminiApiKey?: string | null
    deepseekApiKey?: string | null
    zaiApiKey?: string | null
    anthropicApiKey?: string | null
    telegramId?: string | null
    telegramUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agents?: AgentCreateNestedManyWithoutOwnerInput
    channelBindings?: ChannelBindingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAgentTasksInput = {
    id?: string
    email?: string | null
    walletAddress: string
    walletDerivationIndex?: number | null
    openrouterApiKey?: string | null
    openaiApiKey?: string | null
    groqApiKey?: string | null
    grokApiKey?: string | null
    geminiApiKey?: string | null
    deepseekApiKey?: string | null
    zaiApiKey?: string | null
    anthropicApiKey?: string | null
    telegramId?: string | null
    telegramUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agents?: AgentUncheckedCreateNestedManyWithoutOwnerInput
    channelBindings?: ChannelBindingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAgentTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAgentTasksInput, UserUncheckedCreateWithoutAgentTasksInput>
  }

  export type AgentUpsertWithoutAgentTasksInput = {
    update: XOR<AgentUpdateWithoutAgentTasksInput, AgentUncheckedUpdateWithoutAgentTasksInput>
    create: XOR<AgentCreateWithoutAgentTasksInput, AgentUncheckedCreateWithoutAgentTasksInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutAgentTasksInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutAgentTasksInput, AgentUncheckedUpdateWithoutAgentTasksInput>
  }

  export type AgentUpdateWithoutAgentTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutAgentsNestedInput
    transactions?: TransactionUpdateManyWithoutAgentNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUpdateOneWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUpdateOneWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutAgentTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutAgentNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUncheckedUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUncheckedUpdateOneWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUncheckedUpdateOneWithoutAgentNestedInput
  }

  export type UserUpsertWithoutAgentTasksInput = {
    update: XOR<UserUpdateWithoutAgentTasksInput, UserUncheckedUpdateWithoutAgentTasksInput>
    create: XOR<UserCreateWithoutAgentTasksInput, UserUncheckedCreateWithoutAgentTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAgentTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAgentTasksInput, UserUncheckedUpdateWithoutAgentTasksInput>
  }

  export type UserUpdateWithoutAgentTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    openrouterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    openaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    groqApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    grokApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    deepseekApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    anthropicApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agents?: AgentUpdateManyWithoutOwnerNestedInput
    channelBindings?: ChannelBindingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAgentTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    openrouterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    openaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    groqApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    grokApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    deepseekApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zaiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    anthropicApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agents?: AgentUncheckedUpdateManyWithoutOwnerNestedInput
    channelBindings?: ChannelBindingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AgentCreateWithoutEnsRegistrationInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutAgentsInput
    transactions?: TransactionCreateNestedManyWithoutAgentInput
    activityLogs?: ActivityLogCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationCreateNestedOneWithoutAgentInput
    agentTasks?: AgentTaskCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutEnsRegistrationInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutAgentInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutAgentInput
    channelBindings?: ChannelBindingUncheckedCreateNestedManyWithoutAgentInput
    verification?: AgentVerificationUncheckedCreateNestedOneWithoutAgentInput
    agentTasks?: AgentTaskUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutEnsRegistrationInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutEnsRegistrationInput, AgentUncheckedCreateWithoutEnsRegistrationInput>
  }

  export type AgentUpsertWithoutEnsRegistrationInput = {
    update: XOR<AgentUpdateWithoutEnsRegistrationInput, AgentUncheckedUpdateWithoutEnsRegistrationInput>
    create: XOR<AgentCreateWithoutEnsRegistrationInput, AgentUncheckedCreateWithoutEnsRegistrationInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutEnsRegistrationInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutEnsRegistrationInput, AgentUncheckedUpdateWithoutEnsRegistrationInput>
  }

  export type AgentUpdateWithoutEnsRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutAgentsNestedInput
    transactions?: TransactionUpdateManyWithoutAgentNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUpdateOneWithoutAgentNestedInput
    agentTasks?: AgentTaskUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutEnsRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutAgentNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUncheckedUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUncheckedUpdateOneWithoutAgentNestedInput
    agentTasks?: AgentTaskUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCreateManyOwnerInput = {
    id?: string
    name: string
    description?: string | null
    templateType: string
    status?: string
    systemPrompt?: string | null
    llmProvider?: string
    llmModel?: string
    spendingLimit?: number
    spendingUsed?: number
    agentWalletAddress?: string | null
    walletDerivationIndex?: number | null
    walletType?: string | null
    sessionKeyAddress?: string | null
    sessionKeyPrivateKey?: string | null
    sessionContext?: string | null
    sessionExpiresAt?: Date | string | null
    sessionPermissions?: string | null
    telegramBotToken?: string | null
    telegramChatIds?: string | null
    discordBotToken?: string | null
    webhookSecret?: string | null
    disabledSkills?: string | null
    externalSocials?: string | null
    channels?: string | null
    cronJobs?: string | null
    pairingCode?: string | null
    pairingCodeExpiresAt?: Date | string | null
    openclawAgentId?: string | null
    imageUrl?: string | null
    imageSlug?: string | null
    imageDataBase64?: string | null
    erc8004AgentId?: string | null
    erc8004URI?: string | null
    erc8004TxHash?: string | null
    erc8004ChainId?: number | null
    reputationScore?: number
    exported?: boolean
    exportedAt?: Date | string | null
    configuration?: string | null
    ensSubdomain?: string | null
    ensNode?: string | null
    ensRegisteredAt?: Date | string | null
    agentDeployedTokens?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployedAt?: Date | string | null
  }

  export type AgentTaskCreateManyUserInput = {
    id?: string
    agentId: string
    triggerType: string
    tokenSymbol?: string | null
    conditionType?: string | null
    targetValue?: number | null
    baselinePrice?: number | null
    executeAt?: Date | string | null
    cronSchedule?: string | null
    lastExecutedAt?: Date | string | null
    actionType: string
    actionPayload: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChannelBindingCreateManyUserInput = {
    id?: string
    agentId: string
    channelType: string
    senderIdentifier: string
    senderName?: string | null
    chatIdentifier?: string | null
    pairingCode?: string | null
    bindingType?: string
    isActive?: boolean
    pairedAt?: Date | string
    lastMessageAt?: Date | string
  }

  export type AgentUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUpdateManyWithoutAgentNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUpdateOneWithoutAgentNestedInput
    agentTasks?: AgentTaskUpdateManyWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUpdateOneWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutAgentNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutAgentNestedInput
    channelBindings?: ChannelBindingUncheckedUpdateManyWithoutAgentNestedInput
    verification?: AgentVerificationUncheckedUpdateOneWithoutAgentNestedInput
    agentTasks?: AgentTaskUncheckedUpdateManyWithoutAgentNestedInput
    ensRegistration?: EnsSubdomainUncheckedUpdateOneWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    templateType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    spendingLimit?: FloatFieldUpdateOperationsInput | number
    spendingUsed?: FloatFieldUpdateOperationsInput | number
    agentWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    walletDerivationIndex?: NullableIntFieldUpdateOperationsInput | number | null
    walletType?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionKeyPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    sessionContext?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessionPermissions?: NullableStringFieldUpdateOperationsInput | string | null
    telegramBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    telegramChatIds?: NullableStringFieldUpdateOperationsInput | string | null
    discordBotToken?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    disabledSkills?: NullableStringFieldUpdateOperationsInput | string | null
    externalSocials?: NullableStringFieldUpdateOperationsInput | string | null
    channels?: NullableStringFieldUpdateOperationsInput | string | null
    cronJobs?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openclawAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageSlug?: NullableStringFieldUpdateOperationsInput | string | null
    imageDataBase64?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004AgentId?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004URI?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004TxHash?: NullableStringFieldUpdateOperationsInput | string | null
    erc8004ChainId?: NullableIntFieldUpdateOperationsInput | number | null
    reputationScore?: FloatFieldUpdateOperationsInput | number
    exported?: BoolFieldUpdateOperationsInput | boolean
    exportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ensSubdomain?: NullableStringFieldUpdateOperationsInput | string | null
    ensNode?: NullableStringFieldUpdateOperationsInput | string | null
    ensRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentDeployedTokens?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AgentTaskUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    triggerType?: StringFieldUpdateOperationsInput | string
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionType?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableFloatFieldUpdateOperationsInput | number | null
    baselinePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    executeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    actionPayload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutAgentTasksNestedInput
  }

  export type AgentTaskUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    triggerType?: StringFieldUpdateOperationsInput | string
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionType?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableFloatFieldUpdateOperationsInput | number | null
    baselinePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    executeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    actionPayload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentTaskUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    triggerType?: StringFieldUpdateOperationsInput | string
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionType?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableFloatFieldUpdateOperationsInput | number | null
    baselinePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    executeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    actionPayload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelBindingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelType?: StringFieldUpdateOperationsInput | string
    senderIdentifier?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    chatIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    bindingType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pairedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutChannelBindingsNestedInput
    sessionMessages?: SessionMessageUpdateManyWithoutBindingNestedInput
  }

  export type ChannelBindingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    channelType?: StringFieldUpdateOperationsInput | string
    senderIdentifier?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    chatIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    bindingType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pairedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionMessages?: SessionMessageUncheckedUpdateManyWithoutBindingNestedInput
  }

  export type ChannelBindingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    channelType?: StringFieldUpdateOperationsInput | string
    senderIdentifier?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    chatIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    bindingType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pairedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyAgentInput = {
    id?: string
    txHash?: string | null
    type: string
    status?: string
    fromAddress?: string | null
    toAddress?: string | null
    amount?: number | null
    currency?: string | null
    gasUsed?: number | null
    blockNumber?: number | null
    description?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogCreateManyAgentInput = {
    id?: string
    type: string
    message: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type ChannelBindingCreateManyAgentInput = {
    id?: string
    userId?: string | null
    channelType: string
    senderIdentifier: string
    senderName?: string | null
    chatIdentifier?: string | null
    pairingCode?: string | null
    bindingType?: string
    isActive?: boolean
    pairedAt?: Date | string
    lastMessageAt?: Date | string
  }

  export type AgentTaskCreateManyAgentInput = {
    id?: string
    userId: string
    triggerType: string
    tokenSymbol?: string | null
    conditionType?: string | null
    targetValue?: number | null
    baselinePrice?: number | null
    executeAt?: Date | string | null
    cronSchedule?: string | null
    lastExecutedAt?: Date | string | null
    actionType: string
    actionPayload: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    gasUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    gasUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    gasUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelBindingUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelType?: StringFieldUpdateOperationsInput | string
    senderIdentifier?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    chatIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    bindingType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pairedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutChannelBindingsNestedInput
    sessionMessages?: SessionMessageUpdateManyWithoutBindingNestedInput
  }

  export type ChannelBindingUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    channelType?: StringFieldUpdateOperationsInput | string
    senderIdentifier?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    chatIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    bindingType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pairedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionMessages?: SessionMessageUncheckedUpdateManyWithoutBindingNestedInput
  }

  export type ChannelBindingUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    channelType?: StringFieldUpdateOperationsInput | string
    senderIdentifier?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    chatIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    pairingCode?: NullableStringFieldUpdateOperationsInput | string | null
    bindingType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pairedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentTaskUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    triggerType?: StringFieldUpdateOperationsInput | string
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionType?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableFloatFieldUpdateOperationsInput | number | null
    baselinePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    executeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    actionPayload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAgentTasksNestedInput
  }

  export type AgentTaskUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    triggerType?: StringFieldUpdateOperationsInput | string
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionType?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableFloatFieldUpdateOperationsInput | number | null
    baselinePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    executeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    actionPayload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentTaskUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    triggerType?: StringFieldUpdateOperationsInput | string
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionType?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableFloatFieldUpdateOperationsInput | number | null
    baselinePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    executeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    actionPayload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionMessageCreateManyBindingInput = {
    id?: string
    role: string
    content: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type SessionMessageUpdateWithoutBindingInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionMessageUncheckedUpdateWithoutBindingInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionMessageUncheckedUpdateManyWithoutBindingInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}