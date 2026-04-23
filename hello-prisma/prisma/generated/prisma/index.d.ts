
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
 * Model Sender
 * 
 */
export type Sender = $Result.DefaultSelection<Prisma.$SenderPayload>
/**
 * Model Wisher
 * 
 */
export type Wisher = $Result.DefaultSelection<Prisma.$WisherPayload>
/**
 * Model Card
 * 
 */
export type Card = $Result.DefaultSelection<Prisma.$CardPayload>
/**
 * Model Festival
 * 
 */
export type Festival = $Result.DefaultSelection<Prisma.$FestivalPayload>
/**
 * Model Unpolite
 * 
 */
export type Unpolite = $Result.DefaultSelection<Prisma.$UnpolitePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Senders
 * const senders = await prisma.sender.findMany()
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Senders
   * const senders = await prisma.sender.findMany()
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.sender`: Exposes CRUD operations for the **Sender** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Senders
    * const senders = await prisma.sender.findMany()
    * ```
    */
  get sender(): Prisma.SenderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wisher`: Exposes CRUD operations for the **Wisher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wishers
    * const wishers = await prisma.wisher.findMany()
    * ```
    */
  get wisher(): Prisma.WisherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.card`: Exposes CRUD operations for the **Card** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cards
    * const cards = await prisma.card.findMany()
    * ```
    */
  get card(): Prisma.CardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.festival`: Exposes CRUD operations for the **Festival** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Festivals
    * const festivals = await prisma.festival.findMany()
    * ```
    */
  get festival(): Prisma.FestivalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.unpolite`: Exposes CRUD operations for the **Unpolite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Unpolites
    * const unpolites = await prisma.unpolite.findMany()
    * ```
    */
  get unpolite(): Prisma.UnpoliteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
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
    Sender: 'Sender',
    Wisher: 'Wisher',
    Card: 'Card',
    Festival: 'Festival',
    Unpolite: 'Unpolite',
    User: 'User'
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
      modelProps: "sender" | "wisher" | "card" | "festival" | "unpolite" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Sender: {
        payload: Prisma.$SenderPayload<ExtArgs>
        fields: Prisma.SenderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SenderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SenderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SenderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SenderPayload>
          }
          findFirst: {
            args: Prisma.SenderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SenderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SenderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SenderPayload>
          }
          findMany: {
            args: Prisma.SenderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SenderPayload>[]
          }
          create: {
            args: Prisma.SenderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SenderPayload>
          }
          createMany: {
            args: Prisma.SenderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SenderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SenderPayload>
          }
          update: {
            args: Prisma.SenderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SenderPayload>
          }
          deleteMany: {
            args: Prisma.SenderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SenderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SenderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SenderPayload>
          }
          aggregate: {
            args: Prisma.SenderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSender>
          }
          groupBy: {
            args: Prisma.SenderGroupByArgs<ExtArgs>
            result: $Utils.Optional<SenderGroupByOutputType>[]
          }
          count: {
            args: Prisma.SenderCountArgs<ExtArgs>
            result: $Utils.Optional<SenderCountAggregateOutputType> | number
          }
        }
      }
      Wisher: {
        payload: Prisma.$WisherPayload<ExtArgs>
        fields: Prisma.WisherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WisherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WisherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WisherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WisherPayload>
          }
          findFirst: {
            args: Prisma.WisherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WisherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WisherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WisherPayload>
          }
          findMany: {
            args: Prisma.WisherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WisherPayload>[]
          }
          create: {
            args: Prisma.WisherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WisherPayload>
          }
          createMany: {
            args: Prisma.WisherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WisherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WisherPayload>
          }
          update: {
            args: Prisma.WisherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WisherPayload>
          }
          deleteMany: {
            args: Prisma.WisherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WisherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WisherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WisherPayload>
          }
          aggregate: {
            args: Prisma.WisherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWisher>
          }
          groupBy: {
            args: Prisma.WisherGroupByArgs<ExtArgs>
            result: $Utils.Optional<WisherGroupByOutputType>[]
          }
          count: {
            args: Prisma.WisherCountArgs<ExtArgs>
            result: $Utils.Optional<WisherCountAggregateOutputType> | number
          }
        }
      }
      Card: {
        payload: Prisma.$CardPayload<ExtArgs>
        fields: Prisma.CardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          findFirst: {
            args: Prisma.CardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          findMany: {
            args: Prisma.CardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>[]
          }
          create: {
            args: Prisma.CardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          createMany: {
            args: Prisma.CardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          update: {
            args: Prisma.CardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          deleteMany: {
            args: Prisma.CardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          aggregate: {
            args: Prisma.CardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCard>
          }
          groupBy: {
            args: Prisma.CardGroupByArgs<ExtArgs>
            result: $Utils.Optional<CardGroupByOutputType>[]
          }
          count: {
            args: Prisma.CardCountArgs<ExtArgs>
            result: $Utils.Optional<CardCountAggregateOutputType> | number
          }
        }
      }
      Festival: {
        payload: Prisma.$FestivalPayload<ExtArgs>
        fields: Prisma.FestivalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FestivalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FestivalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          findFirst: {
            args: Prisma.FestivalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FestivalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          findMany: {
            args: Prisma.FestivalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>[]
          }
          create: {
            args: Prisma.FestivalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          createMany: {
            args: Prisma.FestivalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FestivalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          update: {
            args: Prisma.FestivalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          deleteMany: {
            args: Prisma.FestivalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FestivalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FestivalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          aggregate: {
            args: Prisma.FestivalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFestival>
          }
          groupBy: {
            args: Prisma.FestivalGroupByArgs<ExtArgs>
            result: $Utils.Optional<FestivalGroupByOutputType>[]
          }
          count: {
            args: Prisma.FestivalCountArgs<ExtArgs>
            result: $Utils.Optional<FestivalCountAggregateOutputType> | number
          }
        }
      }
      Unpolite: {
        payload: Prisma.$UnpolitePayload<ExtArgs>
        fields: Prisma.UnpoliteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UnpoliteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnpolitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UnpoliteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnpolitePayload>
          }
          findFirst: {
            args: Prisma.UnpoliteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnpolitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UnpoliteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnpolitePayload>
          }
          findMany: {
            args: Prisma.UnpoliteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnpolitePayload>[]
          }
          create: {
            args: Prisma.UnpoliteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnpolitePayload>
          }
          createMany: {
            args: Prisma.UnpoliteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UnpoliteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnpolitePayload>
          }
          update: {
            args: Prisma.UnpoliteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnpolitePayload>
          }
          deleteMany: {
            args: Prisma.UnpoliteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UnpoliteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UnpoliteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnpolitePayload>
          }
          aggregate: {
            args: Prisma.UnpoliteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUnpolite>
          }
          groupBy: {
            args: Prisma.UnpoliteGroupByArgs<ExtArgs>
            result: $Utils.Optional<UnpoliteGroupByOutputType>[]
          }
          count: {
            args: Prisma.UnpoliteCountArgs<ExtArgs>
            result: $Utils.Optional<UnpoliteCountAggregateOutputType> | number
          }
        }
      }
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
    sender?: SenderOmit
    wisher?: WisherOmit
    card?: CardOmit
    festival?: FestivalOmit
    unpolite?: UnpoliteOmit
    user?: UserOmit
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
   * Count Type WisherCountOutputType
   */

  export type WisherCountOutputType = {
    sender: number
  }

  export type WisherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | WisherCountOutputTypeCountSenderArgs
  }

  // Custom InputTypes
  /**
   * WisherCountOutputType without action
   */
  export type WisherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WisherCountOutputType
     */
    select?: WisherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WisherCountOutputType without action
   */
  export type WisherCountOutputTypeCountSenderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SenderWhereInput
  }


  /**
   * Count Type CardCountOutputType
   */

  export type CardCountOutputType = {
    sender: number
  }

  export type CardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | CardCountOutputTypeCountSenderArgs
  }

  // Custom InputTypes
  /**
   * CardCountOutputType without action
   */
  export type CardCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardCountOutputType
     */
    select?: CardCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CardCountOutputType without action
   */
  export type CardCountOutputTypeCountSenderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SenderWhereInput
  }


  /**
   * Count Type FestivalCountOutputType
   */

  export type FestivalCountOutputType = {
    card: number
    wisher: number
    sender: number
  }

  export type FestivalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    card?: boolean | FestivalCountOutputTypeCountCardArgs
    wisher?: boolean | FestivalCountOutputTypeCountWisherArgs
    sender?: boolean | FestivalCountOutputTypeCountSenderArgs
  }

  // Custom InputTypes
  /**
   * FestivalCountOutputType without action
   */
  export type FestivalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalCountOutputType
     */
    select?: FestivalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FestivalCountOutputType without action
   */
  export type FestivalCountOutputTypeCountCardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardWhereInput
  }

  /**
   * FestivalCountOutputType without action
   */
  export type FestivalCountOutputTypeCountWisherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WisherWhereInput
  }

  /**
   * FestivalCountOutputType without action
   */
  export type FestivalCountOutputTypeCountSenderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SenderWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Sender
   */

  export type AggregateSender = {
    _count: SenderCountAggregateOutputType | null
    _avg: SenderAvgAggregateOutputType | null
    _sum: SenderSumAggregateOutputType | null
    _min: SenderMinAggregateOutputType | null
    _max: SenderMaxAggregateOutputType | null
  }

  export type SenderAvgAggregateOutputType = {
    sId: number | null
    festivalId: number | null
    cardId: number | null
    wishId: number | null
  }

  export type SenderSumAggregateOutputType = {
    sId: number | null
    festivalId: number | null
    cardId: number | null
    wishId: number | null
  }

  export type SenderMinAggregateOutputType = {
    sId: number | null
    fullName: string | null
    position: string | null
    department: string | null
    festivalId: number | null
    cardId: number | null
    wishId: number | null
    createdAt: Date | null
  }

  export type SenderMaxAggregateOutputType = {
    sId: number | null
    fullName: string | null
    position: string | null
    department: string | null
    festivalId: number | null
    cardId: number | null
    wishId: number | null
    createdAt: Date | null
  }

  export type SenderCountAggregateOutputType = {
    sId: number
    fullName: number
    position: number
    department: number
    festivalId: number
    cardId: number
    wishId: number
    createdAt: number
    _all: number
  }


  export type SenderAvgAggregateInputType = {
    sId?: true
    festivalId?: true
    cardId?: true
    wishId?: true
  }

  export type SenderSumAggregateInputType = {
    sId?: true
    festivalId?: true
    cardId?: true
    wishId?: true
  }

  export type SenderMinAggregateInputType = {
    sId?: true
    fullName?: true
    position?: true
    department?: true
    festivalId?: true
    cardId?: true
    wishId?: true
    createdAt?: true
  }

  export type SenderMaxAggregateInputType = {
    sId?: true
    fullName?: true
    position?: true
    department?: true
    festivalId?: true
    cardId?: true
    wishId?: true
    createdAt?: true
  }

  export type SenderCountAggregateInputType = {
    sId?: true
    fullName?: true
    position?: true
    department?: true
    festivalId?: true
    cardId?: true
    wishId?: true
    createdAt?: true
    _all?: true
  }

  export type SenderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sender to aggregate.
     */
    where?: SenderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Senders to fetch.
     */
    orderBy?: SenderOrderByWithRelationInput | SenderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SenderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Senders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Senders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Senders
    **/
    _count?: true | SenderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SenderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SenderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SenderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SenderMaxAggregateInputType
  }

  export type GetSenderAggregateType<T extends SenderAggregateArgs> = {
        [P in keyof T & keyof AggregateSender]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSender[P]>
      : GetScalarType<T[P], AggregateSender[P]>
  }




  export type SenderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SenderWhereInput
    orderBy?: SenderOrderByWithAggregationInput | SenderOrderByWithAggregationInput[]
    by: SenderScalarFieldEnum[] | SenderScalarFieldEnum
    having?: SenderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SenderCountAggregateInputType | true
    _avg?: SenderAvgAggregateInputType
    _sum?: SenderSumAggregateInputType
    _min?: SenderMinAggregateInputType
    _max?: SenderMaxAggregateInputType
  }

  export type SenderGroupByOutputType = {
    sId: number
    fullName: string
    position: string
    department: string
    festivalId: number
    cardId: number
    wishId: number
    createdAt: Date
    _count: SenderCountAggregateOutputType | null
    _avg: SenderAvgAggregateOutputType | null
    _sum: SenderSumAggregateOutputType | null
    _min: SenderMinAggregateOutputType | null
    _max: SenderMaxAggregateOutputType | null
  }

  type GetSenderGroupByPayload<T extends SenderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SenderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SenderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SenderGroupByOutputType[P]>
            : GetScalarType<T[P], SenderGroupByOutputType[P]>
        }
      >
    >


  export type SenderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sId?: boolean
    fullName?: boolean
    position?: boolean
    department?: boolean
    festivalId?: boolean
    cardId?: boolean
    wishId?: boolean
    createdAt?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
    wish?: boolean | WisherDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sender"]>



  export type SenderSelectScalar = {
    sId?: boolean
    fullName?: boolean
    position?: boolean
    department?: boolean
    festivalId?: boolean
    cardId?: boolean
    wishId?: boolean
    createdAt?: boolean
  }

  export type SenderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sId" | "fullName" | "position" | "department" | "festivalId" | "cardId" | "wishId" | "createdAt", ExtArgs["result"]["sender"]>
  export type SenderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
    wish?: boolean | WisherDefaultArgs<ExtArgs>
  }

  export type $SenderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sender"
    objects: {
      festival: Prisma.$FestivalPayload<ExtArgs>
      card: Prisma.$CardPayload<ExtArgs>
      wish: Prisma.$WisherPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      sId: number
      fullName: string
      position: string
      department: string
      festivalId: number
      cardId: number
      wishId: number
      createdAt: Date
    }, ExtArgs["result"]["sender"]>
    composites: {}
  }

  type SenderGetPayload<S extends boolean | null | undefined | SenderDefaultArgs> = $Result.GetResult<Prisma.$SenderPayload, S>

  type SenderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SenderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SenderCountAggregateInputType | true
    }

  export interface SenderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sender'], meta: { name: 'Sender' } }
    /**
     * Find zero or one Sender that matches the filter.
     * @param {SenderFindUniqueArgs} args - Arguments to find a Sender
     * @example
     * // Get one Sender
     * const sender = await prisma.sender.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SenderFindUniqueArgs>(args: SelectSubset<T, SenderFindUniqueArgs<ExtArgs>>): Prisma__SenderClient<$Result.GetResult<Prisma.$SenderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sender that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SenderFindUniqueOrThrowArgs} args - Arguments to find a Sender
     * @example
     * // Get one Sender
     * const sender = await prisma.sender.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SenderFindUniqueOrThrowArgs>(args: SelectSubset<T, SenderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SenderClient<$Result.GetResult<Prisma.$SenderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sender that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SenderFindFirstArgs} args - Arguments to find a Sender
     * @example
     * // Get one Sender
     * const sender = await prisma.sender.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SenderFindFirstArgs>(args?: SelectSubset<T, SenderFindFirstArgs<ExtArgs>>): Prisma__SenderClient<$Result.GetResult<Prisma.$SenderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sender that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SenderFindFirstOrThrowArgs} args - Arguments to find a Sender
     * @example
     * // Get one Sender
     * const sender = await prisma.sender.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SenderFindFirstOrThrowArgs>(args?: SelectSubset<T, SenderFindFirstOrThrowArgs<ExtArgs>>): Prisma__SenderClient<$Result.GetResult<Prisma.$SenderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Senders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SenderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Senders
     * const senders = await prisma.sender.findMany()
     * 
     * // Get first 10 Senders
     * const senders = await prisma.sender.findMany({ take: 10 })
     * 
     * // Only select the `sId`
     * const senderWithSIdOnly = await prisma.sender.findMany({ select: { sId: true } })
     * 
     */
    findMany<T extends SenderFindManyArgs>(args?: SelectSubset<T, SenderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SenderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sender.
     * @param {SenderCreateArgs} args - Arguments to create a Sender.
     * @example
     * // Create one Sender
     * const Sender = await prisma.sender.create({
     *   data: {
     *     // ... data to create a Sender
     *   }
     * })
     * 
     */
    create<T extends SenderCreateArgs>(args: SelectSubset<T, SenderCreateArgs<ExtArgs>>): Prisma__SenderClient<$Result.GetResult<Prisma.$SenderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Senders.
     * @param {SenderCreateManyArgs} args - Arguments to create many Senders.
     * @example
     * // Create many Senders
     * const sender = await prisma.sender.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SenderCreateManyArgs>(args?: SelectSubset<T, SenderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Sender.
     * @param {SenderDeleteArgs} args - Arguments to delete one Sender.
     * @example
     * // Delete one Sender
     * const Sender = await prisma.sender.delete({
     *   where: {
     *     // ... filter to delete one Sender
     *   }
     * })
     * 
     */
    delete<T extends SenderDeleteArgs>(args: SelectSubset<T, SenderDeleteArgs<ExtArgs>>): Prisma__SenderClient<$Result.GetResult<Prisma.$SenderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sender.
     * @param {SenderUpdateArgs} args - Arguments to update one Sender.
     * @example
     * // Update one Sender
     * const sender = await prisma.sender.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SenderUpdateArgs>(args: SelectSubset<T, SenderUpdateArgs<ExtArgs>>): Prisma__SenderClient<$Result.GetResult<Prisma.$SenderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Senders.
     * @param {SenderDeleteManyArgs} args - Arguments to filter Senders to delete.
     * @example
     * // Delete a few Senders
     * const { count } = await prisma.sender.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SenderDeleteManyArgs>(args?: SelectSubset<T, SenderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Senders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SenderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Senders
     * const sender = await prisma.sender.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SenderUpdateManyArgs>(args: SelectSubset<T, SenderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sender.
     * @param {SenderUpsertArgs} args - Arguments to update or create a Sender.
     * @example
     * // Update or create a Sender
     * const sender = await prisma.sender.upsert({
     *   create: {
     *     // ... data to create a Sender
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sender we want to update
     *   }
     * })
     */
    upsert<T extends SenderUpsertArgs>(args: SelectSubset<T, SenderUpsertArgs<ExtArgs>>): Prisma__SenderClient<$Result.GetResult<Prisma.$SenderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Senders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SenderCountArgs} args - Arguments to filter Senders to count.
     * @example
     * // Count the number of Senders
     * const count = await prisma.sender.count({
     *   where: {
     *     // ... the filter for the Senders we want to count
     *   }
     * })
    **/
    count<T extends SenderCountArgs>(
      args?: Subset<T, SenderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SenderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sender.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SenderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SenderAggregateArgs>(args: Subset<T, SenderAggregateArgs>): Prisma.PrismaPromise<GetSenderAggregateType<T>>

    /**
     * Group by Sender.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SenderGroupByArgs} args - Group by arguments.
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
      T extends SenderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SenderGroupByArgs['orderBy'] }
        : { orderBy?: SenderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SenderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSenderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sender model
   */
  readonly fields: SenderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sender.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SenderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    festival<T extends FestivalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FestivalDefaultArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    card<T extends CardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CardDefaultArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    wish<T extends WisherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WisherDefaultArgs<ExtArgs>>): Prisma__WisherClient<$Result.GetResult<Prisma.$WisherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Sender model
   */
  interface SenderFieldRefs {
    readonly sId: FieldRef<"Sender", 'Int'>
    readonly fullName: FieldRef<"Sender", 'String'>
    readonly position: FieldRef<"Sender", 'String'>
    readonly department: FieldRef<"Sender", 'String'>
    readonly festivalId: FieldRef<"Sender", 'Int'>
    readonly cardId: FieldRef<"Sender", 'Int'>
    readonly wishId: FieldRef<"Sender", 'Int'>
    readonly createdAt: FieldRef<"Sender", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sender findUnique
   */
  export type SenderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
    /**
     * Filter, which Sender to fetch.
     */
    where: SenderWhereUniqueInput
  }

  /**
   * Sender findUniqueOrThrow
   */
  export type SenderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
    /**
     * Filter, which Sender to fetch.
     */
    where: SenderWhereUniqueInput
  }

  /**
   * Sender findFirst
   */
  export type SenderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
    /**
     * Filter, which Sender to fetch.
     */
    where?: SenderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Senders to fetch.
     */
    orderBy?: SenderOrderByWithRelationInput | SenderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Senders.
     */
    cursor?: SenderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Senders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Senders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Senders.
     */
    distinct?: SenderScalarFieldEnum | SenderScalarFieldEnum[]
  }

  /**
   * Sender findFirstOrThrow
   */
  export type SenderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
    /**
     * Filter, which Sender to fetch.
     */
    where?: SenderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Senders to fetch.
     */
    orderBy?: SenderOrderByWithRelationInput | SenderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Senders.
     */
    cursor?: SenderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Senders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Senders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Senders.
     */
    distinct?: SenderScalarFieldEnum | SenderScalarFieldEnum[]
  }

  /**
   * Sender findMany
   */
  export type SenderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
    /**
     * Filter, which Senders to fetch.
     */
    where?: SenderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Senders to fetch.
     */
    orderBy?: SenderOrderByWithRelationInput | SenderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Senders.
     */
    cursor?: SenderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Senders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Senders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Senders.
     */
    distinct?: SenderScalarFieldEnum | SenderScalarFieldEnum[]
  }

  /**
   * Sender create
   */
  export type SenderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
    /**
     * The data needed to create a Sender.
     */
    data: XOR<SenderCreateInput, SenderUncheckedCreateInput>
  }

  /**
   * Sender createMany
   */
  export type SenderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Senders.
     */
    data: SenderCreateManyInput | SenderCreateManyInput[]
  }

  /**
   * Sender update
   */
  export type SenderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
    /**
     * The data needed to update a Sender.
     */
    data: XOR<SenderUpdateInput, SenderUncheckedUpdateInput>
    /**
     * Choose, which Sender to update.
     */
    where: SenderWhereUniqueInput
  }

  /**
   * Sender updateMany
   */
  export type SenderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Senders.
     */
    data: XOR<SenderUpdateManyMutationInput, SenderUncheckedUpdateManyInput>
    /**
     * Filter which Senders to update
     */
    where?: SenderWhereInput
    /**
     * Limit how many Senders to update.
     */
    limit?: number
  }

  /**
   * Sender upsert
   */
  export type SenderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
    /**
     * The filter to search for the Sender to update in case it exists.
     */
    where: SenderWhereUniqueInput
    /**
     * In case the Sender found by the `where` argument doesn't exist, create a new Sender with this data.
     */
    create: XOR<SenderCreateInput, SenderUncheckedCreateInput>
    /**
     * In case the Sender was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SenderUpdateInput, SenderUncheckedUpdateInput>
  }

  /**
   * Sender delete
   */
  export type SenderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
    /**
     * Filter which Sender to delete.
     */
    where: SenderWhereUniqueInput
  }

  /**
   * Sender deleteMany
   */
  export type SenderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Senders to delete
     */
    where?: SenderWhereInput
    /**
     * Limit how many Senders to delete.
     */
    limit?: number
  }

  /**
   * Sender without action
   */
  export type SenderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
  }


  /**
   * Model Wisher
   */

  export type AggregateWisher = {
    _count: WisherCountAggregateOutputType | null
    _avg: WisherAvgAggregateOutputType | null
    _sum: WisherSumAggregateOutputType | null
    _min: WisherMinAggregateOutputType | null
    _max: WisherMaxAggregateOutputType | null
  }

  export type WisherAvgAggregateOutputType = {
    wId: number | null
    festivalId: number | null
  }

  export type WisherSumAggregateOutputType = {
    wId: number | null
    festivalId: number | null
  }

  export type WisherMinAggregateOutputType = {
    wId: number | null
    wishWord: string | null
    festivalId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type WisherMaxAggregateOutputType = {
    wId: number | null
    wishWord: string | null
    festivalId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type WisherCountAggregateOutputType = {
    wId: number
    wishWord: number
    festivalId: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type WisherAvgAggregateInputType = {
    wId?: true
    festivalId?: true
  }

  export type WisherSumAggregateInputType = {
    wId?: true
    festivalId?: true
  }

  export type WisherMinAggregateInputType = {
    wId?: true
    wishWord?: true
    festivalId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type WisherMaxAggregateInputType = {
    wId?: true
    wishWord?: true
    festivalId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type WisherCountAggregateInputType = {
    wId?: true
    wishWord?: true
    festivalId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type WisherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wisher to aggregate.
     */
    where?: WisherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wishers to fetch.
     */
    orderBy?: WisherOrderByWithRelationInput | WisherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WisherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wishers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wishers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wishers
    **/
    _count?: true | WisherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WisherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WisherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WisherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WisherMaxAggregateInputType
  }

  export type GetWisherAggregateType<T extends WisherAggregateArgs> = {
        [P in keyof T & keyof AggregateWisher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWisher[P]>
      : GetScalarType<T[P], AggregateWisher[P]>
  }




  export type WisherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WisherWhereInput
    orderBy?: WisherOrderByWithAggregationInput | WisherOrderByWithAggregationInput[]
    by: WisherScalarFieldEnum[] | WisherScalarFieldEnum
    having?: WisherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WisherCountAggregateInputType | true
    _avg?: WisherAvgAggregateInputType
    _sum?: WisherSumAggregateInputType
    _min?: WisherMinAggregateInputType
    _max?: WisherMaxAggregateInputType
  }

  export type WisherGroupByOutputType = {
    wId: number
    wishWord: string
    festivalId: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: WisherCountAggregateOutputType | null
    _avg: WisherAvgAggregateOutputType | null
    _sum: WisherSumAggregateOutputType | null
    _min: WisherMinAggregateOutputType | null
    _max: WisherMaxAggregateOutputType | null
  }

  type GetWisherGroupByPayload<T extends WisherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WisherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WisherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WisherGroupByOutputType[P]>
            : GetScalarType<T[P], WisherGroupByOutputType[P]>
        }
      >
    >


  export type WisherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    wId?: boolean
    wishWord?: boolean
    festivalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    sender?: boolean | Wisher$senderArgs<ExtArgs>
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    _count?: boolean | WisherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wisher"]>



  export type WisherSelectScalar = {
    wId?: boolean
    wishWord?: boolean
    festivalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type WisherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"wId" | "wishWord" | "festivalId" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["wisher"]>
  export type WisherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | Wisher$senderArgs<ExtArgs>
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    _count?: boolean | WisherCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $WisherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wisher"
    objects: {
      sender: Prisma.$SenderPayload<ExtArgs>[]
      festival: Prisma.$FestivalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      wId: number
      wishWord: string
      festivalId: number
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["wisher"]>
    composites: {}
  }

  type WisherGetPayload<S extends boolean | null | undefined | WisherDefaultArgs> = $Result.GetResult<Prisma.$WisherPayload, S>

  type WisherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WisherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WisherCountAggregateInputType | true
    }

  export interface WisherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wisher'], meta: { name: 'Wisher' } }
    /**
     * Find zero or one Wisher that matches the filter.
     * @param {WisherFindUniqueArgs} args - Arguments to find a Wisher
     * @example
     * // Get one Wisher
     * const wisher = await prisma.wisher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WisherFindUniqueArgs>(args: SelectSubset<T, WisherFindUniqueArgs<ExtArgs>>): Prisma__WisherClient<$Result.GetResult<Prisma.$WisherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wisher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WisherFindUniqueOrThrowArgs} args - Arguments to find a Wisher
     * @example
     * // Get one Wisher
     * const wisher = await prisma.wisher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WisherFindUniqueOrThrowArgs>(args: SelectSubset<T, WisherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WisherClient<$Result.GetResult<Prisma.$WisherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wisher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WisherFindFirstArgs} args - Arguments to find a Wisher
     * @example
     * // Get one Wisher
     * const wisher = await prisma.wisher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WisherFindFirstArgs>(args?: SelectSubset<T, WisherFindFirstArgs<ExtArgs>>): Prisma__WisherClient<$Result.GetResult<Prisma.$WisherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wisher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WisherFindFirstOrThrowArgs} args - Arguments to find a Wisher
     * @example
     * // Get one Wisher
     * const wisher = await prisma.wisher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WisherFindFirstOrThrowArgs>(args?: SelectSubset<T, WisherFindFirstOrThrowArgs<ExtArgs>>): Prisma__WisherClient<$Result.GetResult<Prisma.$WisherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wishers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WisherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wishers
     * const wishers = await prisma.wisher.findMany()
     * 
     * // Get first 10 Wishers
     * const wishers = await prisma.wisher.findMany({ take: 10 })
     * 
     * // Only select the `wId`
     * const wisherWithWIdOnly = await prisma.wisher.findMany({ select: { wId: true } })
     * 
     */
    findMany<T extends WisherFindManyArgs>(args?: SelectSubset<T, WisherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WisherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wisher.
     * @param {WisherCreateArgs} args - Arguments to create a Wisher.
     * @example
     * // Create one Wisher
     * const Wisher = await prisma.wisher.create({
     *   data: {
     *     // ... data to create a Wisher
     *   }
     * })
     * 
     */
    create<T extends WisherCreateArgs>(args: SelectSubset<T, WisherCreateArgs<ExtArgs>>): Prisma__WisherClient<$Result.GetResult<Prisma.$WisherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wishers.
     * @param {WisherCreateManyArgs} args - Arguments to create many Wishers.
     * @example
     * // Create many Wishers
     * const wisher = await prisma.wisher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WisherCreateManyArgs>(args?: SelectSubset<T, WisherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Wisher.
     * @param {WisherDeleteArgs} args - Arguments to delete one Wisher.
     * @example
     * // Delete one Wisher
     * const Wisher = await prisma.wisher.delete({
     *   where: {
     *     // ... filter to delete one Wisher
     *   }
     * })
     * 
     */
    delete<T extends WisherDeleteArgs>(args: SelectSubset<T, WisherDeleteArgs<ExtArgs>>): Prisma__WisherClient<$Result.GetResult<Prisma.$WisherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wisher.
     * @param {WisherUpdateArgs} args - Arguments to update one Wisher.
     * @example
     * // Update one Wisher
     * const wisher = await prisma.wisher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WisherUpdateArgs>(args: SelectSubset<T, WisherUpdateArgs<ExtArgs>>): Prisma__WisherClient<$Result.GetResult<Prisma.$WisherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wishers.
     * @param {WisherDeleteManyArgs} args - Arguments to filter Wishers to delete.
     * @example
     * // Delete a few Wishers
     * const { count } = await prisma.wisher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WisherDeleteManyArgs>(args?: SelectSubset<T, WisherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wishers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WisherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wishers
     * const wisher = await prisma.wisher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WisherUpdateManyArgs>(args: SelectSubset<T, WisherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Wisher.
     * @param {WisherUpsertArgs} args - Arguments to update or create a Wisher.
     * @example
     * // Update or create a Wisher
     * const wisher = await prisma.wisher.upsert({
     *   create: {
     *     // ... data to create a Wisher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wisher we want to update
     *   }
     * })
     */
    upsert<T extends WisherUpsertArgs>(args: SelectSubset<T, WisherUpsertArgs<ExtArgs>>): Prisma__WisherClient<$Result.GetResult<Prisma.$WisherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wishers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WisherCountArgs} args - Arguments to filter Wishers to count.
     * @example
     * // Count the number of Wishers
     * const count = await prisma.wisher.count({
     *   where: {
     *     // ... the filter for the Wishers we want to count
     *   }
     * })
    **/
    count<T extends WisherCountArgs>(
      args?: Subset<T, WisherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WisherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wisher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WisherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WisherAggregateArgs>(args: Subset<T, WisherAggregateArgs>): Prisma.PrismaPromise<GetWisherAggregateType<T>>

    /**
     * Group by Wisher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WisherGroupByArgs} args - Group by arguments.
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
      T extends WisherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WisherGroupByArgs['orderBy'] }
        : { orderBy?: WisherGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WisherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWisherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wisher model
   */
  readonly fields: WisherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wisher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WisherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sender<T extends Wisher$senderArgs<ExtArgs> = {}>(args?: Subset<T, Wisher$senderArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SenderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    festival<T extends FestivalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FestivalDefaultArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Wisher model
   */
  interface WisherFieldRefs {
    readonly wId: FieldRef<"Wisher", 'Int'>
    readonly wishWord: FieldRef<"Wisher", 'String'>
    readonly festivalId: FieldRef<"Wisher", 'Int'>
    readonly createdAt: FieldRef<"Wisher", 'DateTime'>
    readonly updatedAt: FieldRef<"Wisher", 'DateTime'>
    readonly deletedAt: FieldRef<"Wisher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wisher findUnique
   */
  export type WisherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wisher
     */
    select?: WisherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wisher
     */
    omit?: WisherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WisherInclude<ExtArgs> | null
    /**
     * Filter, which Wisher to fetch.
     */
    where: WisherWhereUniqueInput
  }

  /**
   * Wisher findUniqueOrThrow
   */
  export type WisherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wisher
     */
    select?: WisherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wisher
     */
    omit?: WisherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WisherInclude<ExtArgs> | null
    /**
     * Filter, which Wisher to fetch.
     */
    where: WisherWhereUniqueInput
  }

  /**
   * Wisher findFirst
   */
  export type WisherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wisher
     */
    select?: WisherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wisher
     */
    omit?: WisherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WisherInclude<ExtArgs> | null
    /**
     * Filter, which Wisher to fetch.
     */
    where?: WisherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wishers to fetch.
     */
    orderBy?: WisherOrderByWithRelationInput | WisherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wishers.
     */
    cursor?: WisherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wishers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wishers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wishers.
     */
    distinct?: WisherScalarFieldEnum | WisherScalarFieldEnum[]
  }

  /**
   * Wisher findFirstOrThrow
   */
  export type WisherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wisher
     */
    select?: WisherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wisher
     */
    omit?: WisherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WisherInclude<ExtArgs> | null
    /**
     * Filter, which Wisher to fetch.
     */
    where?: WisherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wishers to fetch.
     */
    orderBy?: WisherOrderByWithRelationInput | WisherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wishers.
     */
    cursor?: WisherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wishers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wishers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wishers.
     */
    distinct?: WisherScalarFieldEnum | WisherScalarFieldEnum[]
  }

  /**
   * Wisher findMany
   */
  export type WisherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wisher
     */
    select?: WisherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wisher
     */
    omit?: WisherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WisherInclude<ExtArgs> | null
    /**
     * Filter, which Wishers to fetch.
     */
    where?: WisherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wishers to fetch.
     */
    orderBy?: WisherOrderByWithRelationInput | WisherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wishers.
     */
    cursor?: WisherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wishers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wishers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wishers.
     */
    distinct?: WisherScalarFieldEnum | WisherScalarFieldEnum[]
  }

  /**
   * Wisher create
   */
  export type WisherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wisher
     */
    select?: WisherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wisher
     */
    omit?: WisherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WisherInclude<ExtArgs> | null
    /**
     * The data needed to create a Wisher.
     */
    data: XOR<WisherCreateInput, WisherUncheckedCreateInput>
  }

  /**
   * Wisher createMany
   */
  export type WisherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wishers.
     */
    data: WisherCreateManyInput | WisherCreateManyInput[]
  }

  /**
   * Wisher update
   */
  export type WisherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wisher
     */
    select?: WisherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wisher
     */
    omit?: WisherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WisherInclude<ExtArgs> | null
    /**
     * The data needed to update a Wisher.
     */
    data: XOR<WisherUpdateInput, WisherUncheckedUpdateInput>
    /**
     * Choose, which Wisher to update.
     */
    where: WisherWhereUniqueInput
  }

  /**
   * Wisher updateMany
   */
  export type WisherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wishers.
     */
    data: XOR<WisherUpdateManyMutationInput, WisherUncheckedUpdateManyInput>
    /**
     * Filter which Wishers to update
     */
    where?: WisherWhereInput
    /**
     * Limit how many Wishers to update.
     */
    limit?: number
  }

  /**
   * Wisher upsert
   */
  export type WisherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wisher
     */
    select?: WisherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wisher
     */
    omit?: WisherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WisherInclude<ExtArgs> | null
    /**
     * The filter to search for the Wisher to update in case it exists.
     */
    where: WisherWhereUniqueInput
    /**
     * In case the Wisher found by the `where` argument doesn't exist, create a new Wisher with this data.
     */
    create: XOR<WisherCreateInput, WisherUncheckedCreateInput>
    /**
     * In case the Wisher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WisherUpdateInput, WisherUncheckedUpdateInput>
  }

  /**
   * Wisher delete
   */
  export type WisherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wisher
     */
    select?: WisherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wisher
     */
    omit?: WisherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WisherInclude<ExtArgs> | null
    /**
     * Filter which Wisher to delete.
     */
    where: WisherWhereUniqueInput
  }

  /**
   * Wisher deleteMany
   */
  export type WisherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wishers to delete
     */
    where?: WisherWhereInput
    /**
     * Limit how many Wishers to delete.
     */
    limit?: number
  }

  /**
   * Wisher.sender
   */
  export type Wisher$senderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
    where?: SenderWhereInput
    orderBy?: SenderOrderByWithRelationInput | SenderOrderByWithRelationInput[]
    cursor?: SenderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SenderScalarFieldEnum | SenderScalarFieldEnum[]
  }

  /**
   * Wisher without action
   */
  export type WisherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wisher
     */
    select?: WisherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wisher
     */
    omit?: WisherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WisherInclude<ExtArgs> | null
  }


  /**
   * Model Card
   */

  export type AggregateCard = {
    _count: CardCountAggregateOutputType | null
    _avg: CardAvgAggregateOutputType | null
    _sum: CardSumAggregateOutputType | null
    _min: CardMinAggregateOutputType | null
    _max: CardMaxAggregateOutputType | null
  }

  export type CardAvgAggregateOutputType = {
    cId: number | null
    festivalId: number | null
  }

  export type CardSumAggregateOutputType = {
    cId: number | null
    festivalId: number | null
  }

  export type CardMinAggregateOutputType = {
    cId: number | null
    imageCard: string | null
    festivalId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type CardMaxAggregateOutputType = {
    cId: number | null
    imageCard: string | null
    festivalId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type CardCountAggregateOutputType = {
    cId: number
    imageCard: number
    festivalId: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type CardAvgAggregateInputType = {
    cId?: true
    festivalId?: true
  }

  export type CardSumAggregateInputType = {
    cId?: true
    festivalId?: true
  }

  export type CardMinAggregateInputType = {
    cId?: true
    imageCard?: true
    festivalId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type CardMaxAggregateInputType = {
    cId?: true
    imageCard?: true
    festivalId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type CardCountAggregateInputType = {
    cId?: true
    imageCard?: true
    festivalId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type CardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Card to aggregate.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cards
    **/
    _count?: true | CardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CardMaxAggregateInputType
  }

  export type GetCardAggregateType<T extends CardAggregateArgs> = {
        [P in keyof T & keyof AggregateCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCard[P]>
      : GetScalarType<T[P], AggregateCard[P]>
  }




  export type CardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardWhereInput
    orderBy?: CardOrderByWithAggregationInput | CardOrderByWithAggregationInput[]
    by: CardScalarFieldEnum[] | CardScalarFieldEnum
    having?: CardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CardCountAggregateInputType | true
    _avg?: CardAvgAggregateInputType
    _sum?: CardSumAggregateInputType
    _min?: CardMinAggregateInputType
    _max?: CardMaxAggregateInputType
  }

  export type CardGroupByOutputType = {
    cId: number
    imageCard: string
    festivalId: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: CardCountAggregateOutputType | null
    _avg: CardAvgAggregateOutputType | null
    _sum: CardSumAggregateOutputType | null
    _min: CardMinAggregateOutputType | null
    _max: CardMaxAggregateOutputType | null
  }

  type GetCardGroupByPayload<T extends CardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CardGroupByOutputType[P]>
            : GetScalarType<T[P], CardGroupByOutputType[P]>
        }
      >
    >


  export type CardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    cId?: boolean
    imageCard?: boolean
    festivalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    sender?: boolean | Card$senderArgs<ExtArgs>
    _count?: boolean | CardCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["card"]>



  export type CardSelectScalar = {
    cId?: boolean
    imageCard?: boolean
    festivalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type CardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"cId" | "imageCard" | "festivalId" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["card"]>
  export type CardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    sender?: boolean | Card$senderArgs<ExtArgs>
    _count?: boolean | CardCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Card"
    objects: {
      festival: Prisma.$FestivalPayload<ExtArgs>
      sender: Prisma.$SenderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      cId: number
      imageCard: string
      festivalId: number
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["card"]>
    composites: {}
  }

  type CardGetPayload<S extends boolean | null | undefined | CardDefaultArgs> = $Result.GetResult<Prisma.$CardPayload, S>

  type CardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CardCountAggregateInputType | true
    }

  export interface CardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Card'], meta: { name: 'Card' } }
    /**
     * Find zero or one Card that matches the filter.
     * @param {CardFindUniqueArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CardFindUniqueArgs>(args: SelectSubset<T, CardFindUniqueArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Card that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CardFindUniqueOrThrowArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CardFindUniqueOrThrowArgs>(args: SelectSubset<T, CardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Card that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindFirstArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CardFindFirstArgs>(args?: SelectSubset<T, CardFindFirstArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Card that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindFirstOrThrowArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CardFindFirstOrThrowArgs>(args?: SelectSubset<T, CardFindFirstOrThrowArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cards
     * const cards = await prisma.card.findMany()
     * 
     * // Get first 10 Cards
     * const cards = await prisma.card.findMany({ take: 10 })
     * 
     * // Only select the `cId`
     * const cardWithCIdOnly = await prisma.card.findMany({ select: { cId: true } })
     * 
     */
    findMany<T extends CardFindManyArgs>(args?: SelectSubset<T, CardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Card.
     * @param {CardCreateArgs} args - Arguments to create a Card.
     * @example
     * // Create one Card
     * const Card = await prisma.card.create({
     *   data: {
     *     // ... data to create a Card
     *   }
     * })
     * 
     */
    create<T extends CardCreateArgs>(args: SelectSubset<T, CardCreateArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cards.
     * @param {CardCreateManyArgs} args - Arguments to create many Cards.
     * @example
     * // Create many Cards
     * const card = await prisma.card.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CardCreateManyArgs>(args?: SelectSubset<T, CardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Card.
     * @param {CardDeleteArgs} args - Arguments to delete one Card.
     * @example
     * // Delete one Card
     * const Card = await prisma.card.delete({
     *   where: {
     *     // ... filter to delete one Card
     *   }
     * })
     * 
     */
    delete<T extends CardDeleteArgs>(args: SelectSubset<T, CardDeleteArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Card.
     * @param {CardUpdateArgs} args - Arguments to update one Card.
     * @example
     * // Update one Card
     * const card = await prisma.card.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CardUpdateArgs>(args: SelectSubset<T, CardUpdateArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cards.
     * @param {CardDeleteManyArgs} args - Arguments to filter Cards to delete.
     * @example
     * // Delete a few Cards
     * const { count } = await prisma.card.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CardDeleteManyArgs>(args?: SelectSubset<T, CardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cards
     * const card = await prisma.card.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CardUpdateManyArgs>(args: SelectSubset<T, CardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Card.
     * @param {CardUpsertArgs} args - Arguments to update or create a Card.
     * @example
     * // Update or create a Card
     * const card = await prisma.card.upsert({
     *   create: {
     *     // ... data to create a Card
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Card we want to update
     *   }
     * })
     */
    upsert<T extends CardUpsertArgs>(args: SelectSubset<T, CardUpsertArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardCountArgs} args - Arguments to filter Cards to count.
     * @example
     * // Count the number of Cards
     * const count = await prisma.card.count({
     *   where: {
     *     // ... the filter for the Cards we want to count
     *   }
     * })
    **/
    count<T extends CardCountArgs>(
      args?: Subset<T, CardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Card.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CardAggregateArgs>(args: Subset<T, CardAggregateArgs>): Prisma.PrismaPromise<GetCardAggregateType<T>>

    /**
     * Group by Card.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardGroupByArgs} args - Group by arguments.
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
      T extends CardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CardGroupByArgs['orderBy'] }
        : { orderBy?: CardGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Card model
   */
  readonly fields: CardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Card.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    festival<T extends FestivalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FestivalDefaultArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends Card$senderArgs<ExtArgs> = {}>(args?: Subset<T, Card$senderArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SenderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Card model
   */
  interface CardFieldRefs {
    readonly cId: FieldRef<"Card", 'Int'>
    readonly imageCard: FieldRef<"Card", 'String'>
    readonly festivalId: FieldRef<"Card", 'Int'>
    readonly createdAt: FieldRef<"Card", 'DateTime'>
    readonly updatedAt: FieldRef<"Card", 'DateTime'>
    readonly deletedAt: FieldRef<"Card", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Card findUnique
   */
  export type CardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card findUniqueOrThrow
   */
  export type CardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card findFirst
   */
  export type CardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card findFirstOrThrow
   */
  export type CardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card findMany
   */
  export type CardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Cards to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card create
   */
  export type CardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The data needed to create a Card.
     */
    data: XOR<CardCreateInput, CardUncheckedCreateInput>
  }

  /**
   * Card createMany
   */
  export type CardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cards.
     */
    data: CardCreateManyInput | CardCreateManyInput[]
  }

  /**
   * Card update
   */
  export type CardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The data needed to update a Card.
     */
    data: XOR<CardUpdateInput, CardUncheckedUpdateInput>
    /**
     * Choose, which Card to update.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card updateMany
   */
  export type CardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cards.
     */
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyInput>
    /**
     * Filter which Cards to update
     */
    where?: CardWhereInput
    /**
     * Limit how many Cards to update.
     */
    limit?: number
  }

  /**
   * Card upsert
   */
  export type CardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The filter to search for the Card to update in case it exists.
     */
    where: CardWhereUniqueInput
    /**
     * In case the Card found by the `where` argument doesn't exist, create a new Card with this data.
     */
    create: XOR<CardCreateInput, CardUncheckedCreateInput>
    /**
     * In case the Card was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CardUpdateInput, CardUncheckedUpdateInput>
  }

  /**
   * Card delete
   */
  export type CardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter which Card to delete.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card deleteMany
   */
  export type CardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cards to delete
     */
    where?: CardWhereInput
    /**
     * Limit how many Cards to delete.
     */
    limit?: number
  }

  /**
   * Card.sender
   */
  export type Card$senderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
    where?: SenderWhereInput
    orderBy?: SenderOrderByWithRelationInput | SenderOrderByWithRelationInput[]
    cursor?: SenderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SenderScalarFieldEnum | SenderScalarFieldEnum[]
  }

  /**
   * Card without action
   */
  export type CardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
  }


  /**
   * Model Festival
   */

  export type AggregateFestival = {
    _count: FestivalCountAggregateOutputType | null
    _avg: FestivalAvgAggregateOutputType | null
    _sum: FestivalSumAggregateOutputType | null
    _min: FestivalMinAggregateOutputType | null
    _max: FestivalMaxAggregateOutputType | null
  }

  export type FestivalAvgAggregateOutputType = {
    fId: number | null
  }

  export type FestivalSumAggregateOutputType = {
    fId: number | null
  }

  export type FestivalMinAggregateOutputType = {
    fId: number | null
    festivalName: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type FestivalMaxAggregateOutputType = {
    fId: number | null
    festivalName: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type FestivalCountAggregateOutputType = {
    fId: number
    festivalName: number
    image: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type FestivalAvgAggregateInputType = {
    fId?: true
  }

  export type FestivalSumAggregateInputType = {
    fId?: true
  }

  export type FestivalMinAggregateInputType = {
    fId?: true
    festivalName?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type FestivalMaxAggregateInputType = {
    fId?: true
    festivalName?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type FestivalCountAggregateInputType = {
    fId?: true
    festivalName?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type FestivalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Festival to aggregate.
     */
    where?: FestivalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festivals to fetch.
     */
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FestivalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festivals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festivals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Festivals
    **/
    _count?: true | FestivalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FestivalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FestivalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FestivalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FestivalMaxAggregateInputType
  }

  export type GetFestivalAggregateType<T extends FestivalAggregateArgs> = {
        [P in keyof T & keyof AggregateFestival]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFestival[P]>
      : GetScalarType<T[P], AggregateFestival[P]>
  }




  export type FestivalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FestivalWhereInput
    orderBy?: FestivalOrderByWithAggregationInput | FestivalOrderByWithAggregationInput[]
    by: FestivalScalarFieldEnum[] | FestivalScalarFieldEnum
    having?: FestivalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FestivalCountAggregateInputType | true
    _avg?: FestivalAvgAggregateInputType
    _sum?: FestivalSumAggregateInputType
    _min?: FestivalMinAggregateInputType
    _max?: FestivalMaxAggregateInputType
  }

  export type FestivalGroupByOutputType = {
    fId: number
    festivalName: string
    image: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: FestivalCountAggregateOutputType | null
    _avg: FestivalAvgAggregateOutputType | null
    _sum: FestivalSumAggregateOutputType | null
    _min: FestivalMinAggregateOutputType | null
    _max: FestivalMaxAggregateOutputType | null
  }

  type GetFestivalGroupByPayload<T extends FestivalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FestivalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FestivalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FestivalGroupByOutputType[P]>
            : GetScalarType<T[P], FestivalGroupByOutputType[P]>
        }
      >
    >


  export type FestivalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    fId?: boolean
    festivalName?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    card?: boolean | Festival$cardArgs<ExtArgs>
    wisher?: boolean | Festival$wisherArgs<ExtArgs>
    sender?: boolean | Festival$senderArgs<ExtArgs>
    _count?: boolean | FestivalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["festival"]>



  export type FestivalSelectScalar = {
    fId?: boolean
    festivalName?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type FestivalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"fId" | "festivalName" | "image" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["festival"]>
  export type FestivalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    card?: boolean | Festival$cardArgs<ExtArgs>
    wisher?: boolean | Festival$wisherArgs<ExtArgs>
    sender?: boolean | Festival$senderArgs<ExtArgs>
    _count?: boolean | FestivalCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $FestivalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Festival"
    objects: {
      card: Prisma.$CardPayload<ExtArgs>[]
      wisher: Prisma.$WisherPayload<ExtArgs>[]
      sender: Prisma.$SenderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      fId: number
      festivalName: string
      image: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["festival"]>
    composites: {}
  }

  type FestivalGetPayload<S extends boolean | null | undefined | FestivalDefaultArgs> = $Result.GetResult<Prisma.$FestivalPayload, S>

  type FestivalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FestivalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FestivalCountAggregateInputType | true
    }

  export interface FestivalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Festival'], meta: { name: 'Festival' } }
    /**
     * Find zero or one Festival that matches the filter.
     * @param {FestivalFindUniqueArgs} args - Arguments to find a Festival
     * @example
     * // Get one Festival
     * const festival = await prisma.festival.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FestivalFindUniqueArgs>(args: SelectSubset<T, FestivalFindUniqueArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Festival that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FestivalFindUniqueOrThrowArgs} args - Arguments to find a Festival
     * @example
     * // Get one Festival
     * const festival = await prisma.festival.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FestivalFindUniqueOrThrowArgs>(args: SelectSubset<T, FestivalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Festival that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalFindFirstArgs} args - Arguments to find a Festival
     * @example
     * // Get one Festival
     * const festival = await prisma.festival.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FestivalFindFirstArgs>(args?: SelectSubset<T, FestivalFindFirstArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Festival that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalFindFirstOrThrowArgs} args - Arguments to find a Festival
     * @example
     * // Get one Festival
     * const festival = await prisma.festival.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FestivalFindFirstOrThrowArgs>(args?: SelectSubset<T, FestivalFindFirstOrThrowArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Festivals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Festivals
     * const festivals = await prisma.festival.findMany()
     * 
     * // Get first 10 Festivals
     * const festivals = await prisma.festival.findMany({ take: 10 })
     * 
     * // Only select the `fId`
     * const festivalWithFIdOnly = await prisma.festival.findMany({ select: { fId: true } })
     * 
     */
    findMany<T extends FestivalFindManyArgs>(args?: SelectSubset<T, FestivalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Festival.
     * @param {FestivalCreateArgs} args - Arguments to create a Festival.
     * @example
     * // Create one Festival
     * const Festival = await prisma.festival.create({
     *   data: {
     *     // ... data to create a Festival
     *   }
     * })
     * 
     */
    create<T extends FestivalCreateArgs>(args: SelectSubset<T, FestivalCreateArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Festivals.
     * @param {FestivalCreateManyArgs} args - Arguments to create many Festivals.
     * @example
     * // Create many Festivals
     * const festival = await prisma.festival.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FestivalCreateManyArgs>(args?: SelectSubset<T, FestivalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Festival.
     * @param {FestivalDeleteArgs} args - Arguments to delete one Festival.
     * @example
     * // Delete one Festival
     * const Festival = await prisma.festival.delete({
     *   where: {
     *     // ... filter to delete one Festival
     *   }
     * })
     * 
     */
    delete<T extends FestivalDeleteArgs>(args: SelectSubset<T, FestivalDeleteArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Festival.
     * @param {FestivalUpdateArgs} args - Arguments to update one Festival.
     * @example
     * // Update one Festival
     * const festival = await prisma.festival.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FestivalUpdateArgs>(args: SelectSubset<T, FestivalUpdateArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Festivals.
     * @param {FestivalDeleteManyArgs} args - Arguments to filter Festivals to delete.
     * @example
     * // Delete a few Festivals
     * const { count } = await prisma.festival.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FestivalDeleteManyArgs>(args?: SelectSubset<T, FestivalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Festivals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Festivals
     * const festival = await prisma.festival.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FestivalUpdateManyArgs>(args: SelectSubset<T, FestivalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Festival.
     * @param {FestivalUpsertArgs} args - Arguments to update or create a Festival.
     * @example
     * // Update or create a Festival
     * const festival = await prisma.festival.upsert({
     *   create: {
     *     // ... data to create a Festival
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Festival we want to update
     *   }
     * })
     */
    upsert<T extends FestivalUpsertArgs>(args: SelectSubset<T, FestivalUpsertArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Festivals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalCountArgs} args - Arguments to filter Festivals to count.
     * @example
     * // Count the number of Festivals
     * const count = await prisma.festival.count({
     *   where: {
     *     // ... the filter for the Festivals we want to count
     *   }
     * })
    **/
    count<T extends FestivalCountArgs>(
      args?: Subset<T, FestivalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FestivalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Festival.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FestivalAggregateArgs>(args: Subset<T, FestivalAggregateArgs>): Prisma.PrismaPromise<GetFestivalAggregateType<T>>

    /**
     * Group by Festival.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalGroupByArgs} args - Group by arguments.
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
      T extends FestivalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FestivalGroupByArgs['orderBy'] }
        : { orderBy?: FestivalGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FestivalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFestivalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Festival model
   */
  readonly fields: FestivalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Festival.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FestivalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    card<T extends Festival$cardArgs<ExtArgs> = {}>(args?: Subset<T, Festival$cardArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wisher<T extends Festival$wisherArgs<ExtArgs> = {}>(args?: Subset<T, Festival$wisherArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WisherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sender<T extends Festival$senderArgs<ExtArgs> = {}>(args?: Subset<T, Festival$senderArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SenderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Festival model
   */
  interface FestivalFieldRefs {
    readonly fId: FieldRef<"Festival", 'Int'>
    readonly festivalName: FieldRef<"Festival", 'String'>
    readonly image: FieldRef<"Festival", 'String'>
    readonly createdAt: FieldRef<"Festival", 'DateTime'>
    readonly updatedAt: FieldRef<"Festival", 'DateTime'>
    readonly deletedAt: FieldRef<"Festival", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Festival findUnique
   */
  export type FestivalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festival to fetch.
     */
    where: FestivalWhereUniqueInput
  }

  /**
   * Festival findUniqueOrThrow
   */
  export type FestivalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festival to fetch.
     */
    where: FestivalWhereUniqueInput
  }

  /**
   * Festival findFirst
   */
  export type FestivalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festival to fetch.
     */
    where?: FestivalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festivals to fetch.
     */
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Festivals.
     */
    cursor?: FestivalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festivals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festivals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Festivals.
     */
    distinct?: FestivalScalarFieldEnum | FestivalScalarFieldEnum[]
  }

  /**
   * Festival findFirstOrThrow
   */
  export type FestivalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festival to fetch.
     */
    where?: FestivalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festivals to fetch.
     */
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Festivals.
     */
    cursor?: FestivalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festivals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festivals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Festivals.
     */
    distinct?: FestivalScalarFieldEnum | FestivalScalarFieldEnum[]
  }

  /**
   * Festival findMany
   */
  export type FestivalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festivals to fetch.
     */
    where?: FestivalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festivals to fetch.
     */
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Festivals.
     */
    cursor?: FestivalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festivals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festivals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Festivals.
     */
    distinct?: FestivalScalarFieldEnum | FestivalScalarFieldEnum[]
  }

  /**
   * Festival create
   */
  export type FestivalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * The data needed to create a Festival.
     */
    data: XOR<FestivalCreateInput, FestivalUncheckedCreateInput>
  }

  /**
   * Festival createMany
   */
  export type FestivalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Festivals.
     */
    data: FestivalCreateManyInput | FestivalCreateManyInput[]
  }

  /**
   * Festival update
   */
  export type FestivalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * The data needed to update a Festival.
     */
    data: XOR<FestivalUpdateInput, FestivalUncheckedUpdateInput>
    /**
     * Choose, which Festival to update.
     */
    where: FestivalWhereUniqueInput
  }

  /**
   * Festival updateMany
   */
  export type FestivalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Festivals.
     */
    data: XOR<FestivalUpdateManyMutationInput, FestivalUncheckedUpdateManyInput>
    /**
     * Filter which Festivals to update
     */
    where?: FestivalWhereInput
    /**
     * Limit how many Festivals to update.
     */
    limit?: number
  }

  /**
   * Festival upsert
   */
  export type FestivalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * The filter to search for the Festival to update in case it exists.
     */
    where: FestivalWhereUniqueInput
    /**
     * In case the Festival found by the `where` argument doesn't exist, create a new Festival with this data.
     */
    create: XOR<FestivalCreateInput, FestivalUncheckedCreateInput>
    /**
     * In case the Festival was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FestivalUpdateInput, FestivalUncheckedUpdateInput>
  }

  /**
   * Festival delete
   */
  export type FestivalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter which Festival to delete.
     */
    where: FestivalWhereUniqueInput
  }

  /**
   * Festival deleteMany
   */
  export type FestivalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Festivals to delete
     */
    where?: FestivalWhereInput
    /**
     * Limit how many Festivals to delete.
     */
    limit?: number
  }

  /**
   * Festival.card
   */
  export type Festival$cardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    where?: CardWhereInput
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    cursor?: CardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Festival.wisher
   */
  export type Festival$wisherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wisher
     */
    select?: WisherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wisher
     */
    omit?: WisherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WisherInclude<ExtArgs> | null
    where?: WisherWhereInput
    orderBy?: WisherOrderByWithRelationInput | WisherOrderByWithRelationInput[]
    cursor?: WisherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WisherScalarFieldEnum | WisherScalarFieldEnum[]
  }

  /**
   * Festival.sender
   */
  export type Festival$senderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sender
     */
    select?: SenderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sender
     */
    omit?: SenderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SenderInclude<ExtArgs> | null
    where?: SenderWhereInput
    orderBy?: SenderOrderByWithRelationInput | SenderOrderByWithRelationInput[]
    cursor?: SenderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SenderScalarFieldEnum | SenderScalarFieldEnum[]
  }

  /**
   * Festival without action
   */
  export type FestivalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
  }


  /**
   * Model Unpolite
   */

  export type AggregateUnpolite = {
    _count: UnpoliteCountAggregateOutputType | null
    _avg: UnpoliteAvgAggregateOutputType | null
    _sum: UnpoliteSumAggregateOutputType | null
    _min: UnpoliteMinAggregateOutputType | null
    _max: UnpoliteMaxAggregateOutputType | null
  }

  export type UnpoliteAvgAggregateOutputType = {
    upId: number | null
  }

  export type UnpoliteSumAggregateOutputType = {
    upId: number | null
  }

  export type UnpoliteMinAggregateOutputType = {
    upId: number | null
    word: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UnpoliteMaxAggregateOutputType = {
    upId: number | null
    word: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UnpoliteCountAggregateOutputType = {
    upId: number
    word: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UnpoliteAvgAggregateInputType = {
    upId?: true
  }

  export type UnpoliteSumAggregateInputType = {
    upId?: true
  }

  export type UnpoliteMinAggregateInputType = {
    upId?: true
    word?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UnpoliteMaxAggregateInputType = {
    upId?: true
    word?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UnpoliteCountAggregateInputType = {
    upId?: true
    word?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UnpoliteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Unpolite to aggregate.
     */
    where?: UnpoliteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Unpolites to fetch.
     */
    orderBy?: UnpoliteOrderByWithRelationInput | UnpoliteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UnpoliteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Unpolites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Unpolites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Unpolites
    **/
    _count?: true | UnpoliteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UnpoliteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UnpoliteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UnpoliteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UnpoliteMaxAggregateInputType
  }

  export type GetUnpoliteAggregateType<T extends UnpoliteAggregateArgs> = {
        [P in keyof T & keyof AggregateUnpolite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUnpolite[P]>
      : GetScalarType<T[P], AggregateUnpolite[P]>
  }




  export type UnpoliteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnpoliteWhereInput
    orderBy?: UnpoliteOrderByWithAggregationInput | UnpoliteOrderByWithAggregationInput[]
    by: UnpoliteScalarFieldEnum[] | UnpoliteScalarFieldEnum
    having?: UnpoliteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UnpoliteCountAggregateInputType | true
    _avg?: UnpoliteAvgAggregateInputType
    _sum?: UnpoliteSumAggregateInputType
    _min?: UnpoliteMinAggregateInputType
    _max?: UnpoliteMaxAggregateInputType
  }

  export type UnpoliteGroupByOutputType = {
    upId: number
    word: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UnpoliteCountAggregateOutputType | null
    _avg: UnpoliteAvgAggregateOutputType | null
    _sum: UnpoliteSumAggregateOutputType | null
    _min: UnpoliteMinAggregateOutputType | null
    _max: UnpoliteMaxAggregateOutputType | null
  }

  type GetUnpoliteGroupByPayload<T extends UnpoliteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UnpoliteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UnpoliteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UnpoliteGroupByOutputType[P]>
            : GetScalarType<T[P], UnpoliteGroupByOutputType[P]>
        }
      >
    >


  export type UnpoliteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    upId?: boolean
    word?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["unpolite"]>



  export type UnpoliteSelectScalar = {
    upId?: boolean
    word?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UnpoliteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"upId" | "word" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["unpolite"]>

  export type $UnpolitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Unpolite"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      upId: number
      word: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["unpolite"]>
    composites: {}
  }

  type UnpoliteGetPayload<S extends boolean | null | undefined | UnpoliteDefaultArgs> = $Result.GetResult<Prisma.$UnpolitePayload, S>

  type UnpoliteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UnpoliteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UnpoliteCountAggregateInputType | true
    }

  export interface UnpoliteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Unpolite'], meta: { name: 'Unpolite' } }
    /**
     * Find zero or one Unpolite that matches the filter.
     * @param {UnpoliteFindUniqueArgs} args - Arguments to find a Unpolite
     * @example
     * // Get one Unpolite
     * const unpolite = await prisma.unpolite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UnpoliteFindUniqueArgs>(args: SelectSubset<T, UnpoliteFindUniqueArgs<ExtArgs>>): Prisma__UnpoliteClient<$Result.GetResult<Prisma.$UnpolitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Unpolite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UnpoliteFindUniqueOrThrowArgs} args - Arguments to find a Unpolite
     * @example
     * // Get one Unpolite
     * const unpolite = await prisma.unpolite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UnpoliteFindUniqueOrThrowArgs>(args: SelectSubset<T, UnpoliteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UnpoliteClient<$Result.GetResult<Prisma.$UnpolitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unpolite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnpoliteFindFirstArgs} args - Arguments to find a Unpolite
     * @example
     * // Get one Unpolite
     * const unpolite = await prisma.unpolite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UnpoliteFindFirstArgs>(args?: SelectSubset<T, UnpoliteFindFirstArgs<ExtArgs>>): Prisma__UnpoliteClient<$Result.GetResult<Prisma.$UnpolitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unpolite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnpoliteFindFirstOrThrowArgs} args - Arguments to find a Unpolite
     * @example
     * // Get one Unpolite
     * const unpolite = await prisma.unpolite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UnpoliteFindFirstOrThrowArgs>(args?: SelectSubset<T, UnpoliteFindFirstOrThrowArgs<ExtArgs>>): Prisma__UnpoliteClient<$Result.GetResult<Prisma.$UnpolitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Unpolites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnpoliteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Unpolites
     * const unpolites = await prisma.unpolite.findMany()
     * 
     * // Get first 10 Unpolites
     * const unpolites = await prisma.unpolite.findMany({ take: 10 })
     * 
     * // Only select the `upId`
     * const unpoliteWithUpIdOnly = await prisma.unpolite.findMany({ select: { upId: true } })
     * 
     */
    findMany<T extends UnpoliteFindManyArgs>(args?: SelectSubset<T, UnpoliteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnpolitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Unpolite.
     * @param {UnpoliteCreateArgs} args - Arguments to create a Unpolite.
     * @example
     * // Create one Unpolite
     * const Unpolite = await prisma.unpolite.create({
     *   data: {
     *     // ... data to create a Unpolite
     *   }
     * })
     * 
     */
    create<T extends UnpoliteCreateArgs>(args: SelectSubset<T, UnpoliteCreateArgs<ExtArgs>>): Prisma__UnpoliteClient<$Result.GetResult<Prisma.$UnpolitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Unpolites.
     * @param {UnpoliteCreateManyArgs} args - Arguments to create many Unpolites.
     * @example
     * // Create many Unpolites
     * const unpolite = await prisma.unpolite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UnpoliteCreateManyArgs>(args?: SelectSubset<T, UnpoliteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Unpolite.
     * @param {UnpoliteDeleteArgs} args - Arguments to delete one Unpolite.
     * @example
     * // Delete one Unpolite
     * const Unpolite = await prisma.unpolite.delete({
     *   where: {
     *     // ... filter to delete one Unpolite
     *   }
     * })
     * 
     */
    delete<T extends UnpoliteDeleteArgs>(args: SelectSubset<T, UnpoliteDeleteArgs<ExtArgs>>): Prisma__UnpoliteClient<$Result.GetResult<Prisma.$UnpolitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Unpolite.
     * @param {UnpoliteUpdateArgs} args - Arguments to update one Unpolite.
     * @example
     * // Update one Unpolite
     * const unpolite = await prisma.unpolite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UnpoliteUpdateArgs>(args: SelectSubset<T, UnpoliteUpdateArgs<ExtArgs>>): Prisma__UnpoliteClient<$Result.GetResult<Prisma.$UnpolitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Unpolites.
     * @param {UnpoliteDeleteManyArgs} args - Arguments to filter Unpolites to delete.
     * @example
     * // Delete a few Unpolites
     * const { count } = await prisma.unpolite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UnpoliteDeleteManyArgs>(args?: SelectSubset<T, UnpoliteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Unpolites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnpoliteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Unpolites
     * const unpolite = await prisma.unpolite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UnpoliteUpdateManyArgs>(args: SelectSubset<T, UnpoliteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Unpolite.
     * @param {UnpoliteUpsertArgs} args - Arguments to update or create a Unpolite.
     * @example
     * // Update or create a Unpolite
     * const unpolite = await prisma.unpolite.upsert({
     *   create: {
     *     // ... data to create a Unpolite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Unpolite we want to update
     *   }
     * })
     */
    upsert<T extends UnpoliteUpsertArgs>(args: SelectSubset<T, UnpoliteUpsertArgs<ExtArgs>>): Prisma__UnpoliteClient<$Result.GetResult<Prisma.$UnpolitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Unpolites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnpoliteCountArgs} args - Arguments to filter Unpolites to count.
     * @example
     * // Count the number of Unpolites
     * const count = await prisma.unpolite.count({
     *   where: {
     *     // ... the filter for the Unpolites we want to count
     *   }
     * })
    **/
    count<T extends UnpoliteCountArgs>(
      args?: Subset<T, UnpoliteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UnpoliteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Unpolite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnpoliteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UnpoliteAggregateArgs>(args: Subset<T, UnpoliteAggregateArgs>): Prisma.PrismaPromise<GetUnpoliteAggregateType<T>>

    /**
     * Group by Unpolite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnpoliteGroupByArgs} args - Group by arguments.
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
      T extends UnpoliteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UnpoliteGroupByArgs['orderBy'] }
        : { orderBy?: UnpoliteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UnpoliteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnpoliteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Unpolite model
   */
  readonly fields: UnpoliteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Unpolite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UnpoliteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Unpolite model
   */
  interface UnpoliteFieldRefs {
    readonly upId: FieldRef<"Unpolite", 'Int'>
    readonly word: FieldRef<"Unpolite", 'String'>
    readonly createdAt: FieldRef<"Unpolite", 'DateTime'>
    readonly updatedAt: FieldRef<"Unpolite", 'DateTime'>
    readonly deletedAt: FieldRef<"Unpolite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Unpolite findUnique
   */
  export type UnpoliteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unpolite
     */
    select?: UnpoliteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unpolite
     */
    omit?: UnpoliteOmit<ExtArgs> | null
    /**
     * Filter, which Unpolite to fetch.
     */
    where: UnpoliteWhereUniqueInput
  }

  /**
   * Unpolite findUniqueOrThrow
   */
  export type UnpoliteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unpolite
     */
    select?: UnpoliteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unpolite
     */
    omit?: UnpoliteOmit<ExtArgs> | null
    /**
     * Filter, which Unpolite to fetch.
     */
    where: UnpoliteWhereUniqueInput
  }

  /**
   * Unpolite findFirst
   */
  export type UnpoliteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unpolite
     */
    select?: UnpoliteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unpolite
     */
    omit?: UnpoliteOmit<ExtArgs> | null
    /**
     * Filter, which Unpolite to fetch.
     */
    where?: UnpoliteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Unpolites to fetch.
     */
    orderBy?: UnpoliteOrderByWithRelationInput | UnpoliteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Unpolites.
     */
    cursor?: UnpoliteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Unpolites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Unpolites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Unpolites.
     */
    distinct?: UnpoliteScalarFieldEnum | UnpoliteScalarFieldEnum[]
  }

  /**
   * Unpolite findFirstOrThrow
   */
  export type UnpoliteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unpolite
     */
    select?: UnpoliteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unpolite
     */
    omit?: UnpoliteOmit<ExtArgs> | null
    /**
     * Filter, which Unpolite to fetch.
     */
    where?: UnpoliteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Unpolites to fetch.
     */
    orderBy?: UnpoliteOrderByWithRelationInput | UnpoliteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Unpolites.
     */
    cursor?: UnpoliteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Unpolites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Unpolites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Unpolites.
     */
    distinct?: UnpoliteScalarFieldEnum | UnpoliteScalarFieldEnum[]
  }

  /**
   * Unpolite findMany
   */
  export type UnpoliteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unpolite
     */
    select?: UnpoliteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unpolite
     */
    omit?: UnpoliteOmit<ExtArgs> | null
    /**
     * Filter, which Unpolites to fetch.
     */
    where?: UnpoliteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Unpolites to fetch.
     */
    orderBy?: UnpoliteOrderByWithRelationInput | UnpoliteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Unpolites.
     */
    cursor?: UnpoliteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Unpolites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Unpolites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Unpolites.
     */
    distinct?: UnpoliteScalarFieldEnum | UnpoliteScalarFieldEnum[]
  }

  /**
   * Unpolite create
   */
  export type UnpoliteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unpolite
     */
    select?: UnpoliteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unpolite
     */
    omit?: UnpoliteOmit<ExtArgs> | null
    /**
     * The data needed to create a Unpolite.
     */
    data: XOR<UnpoliteCreateInput, UnpoliteUncheckedCreateInput>
  }

  /**
   * Unpolite createMany
   */
  export type UnpoliteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Unpolites.
     */
    data: UnpoliteCreateManyInput | UnpoliteCreateManyInput[]
  }

  /**
   * Unpolite update
   */
  export type UnpoliteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unpolite
     */
    select?: UnpoliteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unpolite
     */
    omit?: UnpoliteOmit<ExtArgs> | null
    /**
     * The data needed to update a Unpolite.
     */
    data: XOR<UnpoliteUpdateInput, UnpoliteUncheckedUpdateInput>
    /**
     * Choose, which Unpolite to update.
     */
    where: UnpoliteWhereUniqueInput
  }

  /**
   * Unpolite updateMany
   */
  export type UnpoliteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Unpolites.
     */
    data: XOR<UnpoliteUpdateManyMutationInput, UnpoliteUncheckedUpdateManyInput>
    /**
     * Filter which Unpolites to update
     */
    where?: UnpoliteWhereInput
    /**
     * Limit how many Unpolites to update.
     */
    limit?: number
  }

  /**
   * Unpolite upsert
   */
  export type UnpoliteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unpolite
     */
    select?: UnpoliteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unpolite
     */
    omit?: UnpoliteOmit<ExtArgs> | null
    /**
     * The filter to search for the Unpolite to update in case it exists.
     */
    where: UnpoliteWhereUniqueInput
    /**
     * In case the Unpolite found by the `where` argument doesn't exist, create a new Unpolite with this data.
     */
    create: XOR<UnpoliteCreateInput, UnpoliteUncheckedCreateInput>
    /**
     * In case the Unpolite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UnpoliteUpdateInput, UnpoliteUncheckedUpdateInput>
  }

  /**
   * Unpolite delete
   */
  export type UnpoliteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unpolite
     */
    select?: UnpoliteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unpolite
     */
    omit?: UnpoliteOmit<ExtArgs> | null
    /**
     * Filter which Unpolite to delete.
     */
    where: UnpoliteWhereUniqueInput
  }

  /**
   * Unpolite deleteMany
   */
  export type UnpoliteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Unpolites to delete
     */
    where?: UnpoliteWhereInput
    /**
     * Limit how many Unpolites to delete.
     */
    limit?: number
  }

  /**
   * Unpolite without action
   */
  export type UnpoliteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unpolite
     */
    select?: UnpoliteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unpolite
     */
    omit?: UnpoliteOmit<ExtArgs> | null
  }


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
    uId: number | null
  }

  export type UserSumAggregateOutputType = {
    uId: number | null
  }

  export type UserMinAggregateOutputType = {
    uId: number | null
    firstName: string | null
    userName: string | null
    password: string | null
  }

  export type UserMaxAggregateOutputType = {
    uId: number | null
    firstName: string | null
    userName: string | null
    password: string | null
  }

  export type UserCountAggregateOutputType = {
    uId: number
    firstName: number
    userName: number
    password: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    uId?: true
  }

  export type UserSumAggregateInputType = {
    uId?: true
  }

  export type UserMinAggregateInputType = {
    uId?: true
    firstName?: true
    userName?: true
    password?: true
  }

  export type UserMaxAggregateInputType = {
    uId?: true
    firstName?: true
    userName?: true
    password?: true
  }

  export type UserCountAggregateInputType = {
    uId?: true
    firstName?: true
    userName?: true
    password?: true
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
    uId: number
    firstName: string
    userName: string
    password: string
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
    uId?: boolean
    firstName?: boolean
    userName?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    uId?: boolean
    firstName?: boolean
    userName?: boolean
    password?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uId" | "firstName" | "userName" | "password", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      uId: number
      firstName: string
      userName: string
      password: string
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
     * // Only select the `uId`
     * const userWithUIdOnly = await prisma.user.findMany({ select: { uId: true } })
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
    readonly uId: FieldRef<"User", 'Int'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly userName: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
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
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
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
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable',
    Snapshot: 'Snapshot'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SenderScalarFieldEnum: {
    sId: 'sId',
    fullName: 'fullName',
    position: 'position',
    department: 'department',
    festivalId: 'festivalId',
    cardId: 'cardId',
    wishId: 'wishId',
    createdAt: 'createdAt'
  };

  export type SenderScalarFieldEnum = (typeof SenderScalarFieldEnum)[keyof typeof SenderScalarFieldEnum]


  export const WisherScalarFieldEnum: {
    wId: 'wId',
    wishWord: 'wishWord',
    festivalId: 'festivalId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type WisherScalarFieldEnum = (typeof WisherScalarFieldEnum)[keyof typeof WisherScalarFieldEnum]


  export const CardScalarFieldEnum: {
    cId: 'cId',
    imageCard: 'imageCard',
    festivalId: 'festivalId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type CardScalarFieldEnum = (typeof CardScalarFieldEnum)[keyof typeof CardScalarFieldEnum]


  export const FestivalScalarFieldEnum: {
    fId: 'fId',
    festivalName: 'festivalName',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type FestivalScalarFieldEnum = (typeof FestivalScalarFieldEnum)[keyof typeof FestivalScalarFieldEnum]


  export const UnpoliteScalarFieldEnum: {
    upId: 'upId',
    word: 'word',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UnpoliteScalarFieldEnum = (typeof UnpoliteScalarFieldEnum)[keyof typeof UnpoliteScalarFieldEnum]


  export const UserScalarFieldEnum: {
    uId: 'uId',
    firstName: 'firstName',
    userName: 'userName',
    password: 'password'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type SenderWhereInput = {
    AND?: SenderWhereInput | SenderWhereInput[]
    OR?: SenderWhereInput[]
    NOT?: SenderWhereInput | SenderWhereInput[]
    sId?: IntFilter<"Sender"> | number
    fullName?: StringFilter<"Sender"> | string
    position?: StringFilter<"Sender"> | string
    department?: StringFilter<"Sender"> | string
    festivalId?: IntFilter<"Sender"> | number
    cardId?: IntFilter<"Sender"> | number
    wishId?: IntFilter<"Sender"> | number
    createdAt?: DateTimeFilter<"Sender"> | Date | string
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
    card?: XOR<CardScalarRelationFilter, CardWhereInput>
    wish?: XOR<WisherScalarRelationFilter, WisherWhereInput>
  }

  export type SenderOrderByWithRelationInput = {
    sId?: SortOrder
    fullName?: SortOrder
    position?: SortOrder
    department?: SortOrder
    festivalId?: SortOrder
    cardId?: SortOrder
    wishId?: SortOrder
    createdAt?: SortOrder
    festival?: FestivalOrderByWithRelationInput
    card?: CardOrderByWithRelationInput
    wish?: WisherOrderByWithRelationInput
  }

  export type SenderWhereUniqueInput = Prisma.AtLeast<{
    sId?: number
    AND?: SenderWhereInput | SenderWhereInput[]
    OR?: SenderWhereInput[]
    NOT?: SenderWhereInput | SenderWhereInput[]
    fullName?: StringFilter<"Sender"> | string
    position?: StringFilter<"Sender"> | string
    department?: StringFilter<"Sender"> | string
    festivalId?: IntFilter<"Sender"> | number
    cardId?: IntFilter<"Sender"> | number
    wishId?: IntFilter<"Sender"> | number
    createdAt?: DateTimeFilter<"Sender"> | Date | string
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
    card?: XOR<CardScalarRelationFilter, CardWhereInput>
    wish?: XOR<WisherScalarRelationFilter, WisherWhereInput>
  }, "sId">

  export type SenderOrderByWithAggregationInput = {
    sId?: SortOrder
    fullName?: SortOrder
    position?: SortOrder
    department?: SortOrder
    festivalId?: SortOrder
    cardId?: SortOrder
    wishId?: SortOrder
    createdAt?: SortOrder
    _count?: SenderCountOrderByAggregateInput
    _avg?: SenderAvgOrderByAggregateInput
    _max?: SenderMaxOrderByAggregateInput
    _min?: SenderMinOrderByAggregateInput
    _sum?: SenderSumOrderByAggregateInput
  }

  export type SenderScalarWhereWithAggregatesInput = {
    AND?: SenderScalarWhereWithAggregatesInput | SenderScalarWhereWithAggregatesInput[]
    OR?: SenderScalarWhereWithAggregatesInput[]
    NOT?: SenderScalarWhereWithAggregatesInput | SenderScalarWhereWithAggregatesInput[]
    sId?: IntWithAggregatesFilter<"Sender"> | number
    fullName?: StringWithAggregatesFilter<"Sender"> | string
    position?: StringWithAggregatesFilter<"Sender"> | string
    department?: StringWithAggregatesFilter<"Sender"> | string
    festivalId?: IntWithAggregatesFilter<"Sender"> | number
    cardId?: IntWithAggregatesFilter<"Sender"> | number
    wishId?: IntWithAggregatesFilter<"Sender"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Sender"> | Date | string
  }

  export type WisherWhereInput = {
    AND?: WisherWhereInput | WisherWhereInput[]
    OR?: WisherWhereInput[]
    NOT?: WisherWhereInput | WisherWhereInput[]
    wId?: IntFilter<"Wisher"> | number
    wishWord?: StringFilter<"Wisher"> | string
    festivalId?: IntFilter<"Wisher"> | number
    createdAt?: DateTimeFilter<"Wisher"> | Date | string
    updatedAt?: DateTimeFilter<"Wisher"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Wisher"> | Date | string | null
    sender?: SenderListRelationFilter
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
  }

  export type WisherOrderByWithRelationInput = {
    wId?: SortOrder
    wishWord?: SortOrder
    festivalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    sender?: SenderOrderByRelationAggregateInput
    festival?: FestivalOrderByWithRelationInput
  }

  export type WisherWhereUniqueInput = Prisma.AtLeast<{
    wId?: number
    AND?: WisherWhereInput | WisherWhereInput[]
    OR?: WisherWhereInput[]
    NOT?: WisherWhereInput | WisherWhereInput[]
    wishWord?: StringFilter<"Wisher"> | string
    festivalId?: IntFilter<"Wisher"> | number
    createdAt?: DateTimeFilter<"Wisher"> | Date | string
    updatedAt?: DateTimeFilter<"Wisher"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Wisher"> | Date | string | null
    sender?: SenderListRelationFilter
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
  }, "wId">

  export type WisherOrderByWithAggregationInput = {
    wId?: SortOrder
    wishWord?: SortOrder
    festivalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: WisherCountOrderByAggregateInput
    _avg?: WisherAvgOrderByAggregateInput
    _max?: WisherMaxOrderByAggregateInput
    _min?: WisherMinOrderByAggregateInput
    _sum?: WisherSumOrderByAggregateInput
  }

  export type WisherScalarWhereWithAggregatesInput = {
    AND?: WisherScalarWhereWithAggregatesInput | WisherScalarWhereWithAggregatesInput[]
    OR?: WisherScalarWhereWithAggregatesInput[]
    NOT?: WisherScalarWhereWithAggregatesInput | WisherScalarWhereWithAggregatesInput[]
    wId?: IntWithAggregatesFilter<"Wisher"> | number
    wishWord?: StringWithAggregatesFilter<"Wisher"> | string
    festivalId?: IntWithAggregatesFilter<"Wisher"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Wisher"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Wisher"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Wisher"> | Date | string | null
  }

  export type CardWhereInput = {
    AND?: CardWhereInput | CardWhereInput[]
    OR?: CardWhereInput[]
    NOT?: CardWhereInput | CardWhereInput[]
    cId?: IntFilter<"Card"> | number
    imageCard?: StringFilter<"Card"> | string
    festivalId?: IntFilter<"Card"> | number
    createdAt?: DateTimeFilter<"Card"> | Date | string
    updatedAt?: DateTimeFilter<"Card"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Card"> | Date | string | null
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
    sender?: SenderListRelationFilter
  }

  export type CardOrderByWithRelationInput = {
    cId?: SortOrder
    imageCard?: SortOrder
    festivalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    festival?: FestivalOrderByWithRelationInput
    sender?: SenderOrderByRelationAggregateInput
  }

  export type CardWhereUniqueInput = Prisma.AtLeast<{
    cId?: number
    AND?: CardWhereInput | CardWhereInput[]
    OR?: CardWhereInput[]
    NOT?: CardWhereInput | CardWhereInput[]
    imageCard?: StringFilter<"Card"> | string
    festivalId?: IntFilter<"Card"> | number
    createdAt?: DateTimeFilter<"Card"> | Date | string
    updatedAt?: DateTimeFilter<"Card"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Card"> | Date | string | null
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
    sender?: SenderListRelationFilter
  }, "cId">

  export type CardOrderByWithAggregationInput = {
    cId?: SortOrder
    imageCard?: SortOrder
    festivalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: CardCountOrderByAggregateInput
    _avg?: CardAvgOrderByAggregateInput
    _max?: CardMaxOrderByAggregateInput
    _min?: CardMinOrderByAggregateInput
    _sum?: CardSumOrderByAggregateInput
  }

  export type CardScalarWhereWithAggregatesInput = {
    AND?: CardScalarWhereWithAggregatesInput | CardScalarWhereWithAggregatesInput[]
    OR?: CardScalarWhereWithAggregatesInput[]
    NOT?: CardScalarWhereWithAggregatesInput | CardScalarWhereWithAggregatesInput[]
    cId?: IntWithAggregatesFilter<"Card"> | number
    imageCard?: StringWithAggregatesFilter<"Card"> | string
    festivalId?: IntWithAggregatesFilter<"Card"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Card"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Card"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Card"> | Date | string | null
  }

  export type FestivalWhereInput = {
    AND?: FestivalWhereInput | FestivalWhereInput[]
    OR?: FestivalWhereInput[]
    NOT?: FestivalWhereInput | FestivalWhereInput[]
    fId?: IntFilter<"Festival"> | number
    festivalName?: StringFilter<"Festival"> | string
    image?: StringFilter<"Festival"> | string
    createdAt?: DateTimeFilter<"Festival"> | Date | string
    updatedAt?: DateTimeFilter<"Festival"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Festival"> | Date | string | null
    card?: CardListRelationFilter
    wisher?: WisherListRelationFilter
    sender?: SenderListRelationFilter
  }

  export type FestivalOrderByWithRelationInput = {
    fId?: SortOrder
    festivalName?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    card?: CardOrderByRelationAggregateInput
    wisher?: WisherOrderByRelationAggregateInput
    sender?: SenderOrderByRelationAggregateInput
  }

  export type FestivalWhereUniqueInput = Prisma.AtLeast<{
    fId?: number
    AND?: FestivalWhereInput | FestivalWhereInput[]
    OR?: FestivalWhereInput[]
    NOT?: FestivalWhereInput | FestivalWhereInput[]
    festivalName?: StringFilter<"Festival"> | string
    image?: StringFilter<"Festival"> | string
    createdAt?: DateTimeFilter<"Festival"> | Date | string
    updatedAt?: DateTimeFilter<"Festival"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Festival"> | Date | string | null
    card?: CardListRelationFilter
    wisher?: WisherListRelationFilter
    sender?: SenderListRelationFilter
  }, "fId">

  export type FestivalOrderByWithAggregationInput = {
    fId?: SortOrder
    festivalName?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: FestivalCountOrderByAggregateInput
    _avg?: FestivalAvgOrderByAggregateInput
    _max?: FestivalMaxOrderByAggregateInput
    _min?: FestivalMinOrderByAggregateInput
    _sum?: FestivalSumOrderByAggregateInput
  }

  export type FestivalScalarWhereWithAggregatesInput = {
    AND?: FestivalScalarWhereWithAggregatesInput | FestivalScalarWhereWithAggregatesInput[]
    OR?: FestivalScalarWhereWithAggregatesInput[]
    NOT?: FestivalScalarWhereWithAggregatesInput | FestivalScalarWhereWithAggregatesInput[]
    fId?: IntWithAggregatesFilter<"Festival"> | number
    festivalName?: StringWithAggregatesFilter<"Festival"> | string
    image?: StringWithAggregatesFilter<"Festival"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Festival"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Festival"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Festival"> | Date | string | null
  }

  export type UnpoliteWhereInput = {
    AND?: UnpoliteWhereInput | UnpoliteWhereInput[]
    OR?: UnpoliteWhereInput[]
    NOT?: UnpoliteWhereInput | UnpoliteWhereInput[]
    upId?: IntFilter<"Unpolite"> | number
    word?: StringFilter<"Unpolite"> | string
    createdAt?: DateTimeFilter<"Unpolite"> | Date | string
    updatedAt?: DateTimeFilter<"Unpolite"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Unpolite"> | Date | string | null
  }

  export type UnpoliteOrderByWithRelationInput = {
    upId?: SortOrder
    word?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
  }

  export type UnpoliteWhereUniqueInput = Prisma.AtLeast<{
    upId?: number
    AND?: UnpoliteWhereInput | UnpoliteWhereInput[]
    OR?: UnpoliteWhereInput[]
    NOT?: UnpoliteWhereInput | UnpoliteWhereInput[]
    word?: StringFilter<"Unpolite"> | string
    createdAt?: DateTimeFilter<"Unpolite"> | Date | string
    updatedAt?: DateTimeFilter<"Unpolite"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Unpolite"> | Date | string | null
  }, "upId">

  export type UnpoliteOrderByWithAggregationInput = {
    upId?: SortOrder
    word?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UnpoliteCountOrderByAggregateInput
    _avg?: UnpoliteAvgOrderByAggregateInput
    _max?: UnpoliteMaxOrderByAggregateInput
    _min?: UnpoliteMinOrderByAggregateInput
    _sum?: UnpoliteSumOrderByAggregateInput
  }

  export type UnpoliteScalarWhereWithAggregatesInput = {
    AND?: UnpoliteScalarWhereWithAggregatesInput | UnpoliteScalarWhereWithAggregatesInput[]
    OR?: UnpoliteScalarWhereWithAggregatesInput[]
    NOT?: UnpoliteScalarWhereWithAggregatesInput | UnpoliteScalarWhereWithAggregatesInput[]
    upId?: IntWithAggregatesFilter<"Unpolite"> | number
    word?: StringWithAggregatesFilter<"Unpolite"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Unpolite"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Unpolite"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Unpolite"> | Date | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    uId?: IntFilter<"User"> | number
    firstName?: StringFilter<"User"> | string
    userName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
  }

  export type UserOrderByWithRelationInput = {
    uId?: SortOrder
    firstName?: SortOrder
    userName?: SortOrder
    password?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    uId?: number
    userName?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
  }, "uId" | "userName">

  export type UserOrderByWithAggregationInput = {
    uId?: SortOrder
    firstName?: SortOrder
    userName?: SortOrder
    password?: SortOrder
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
    uId?: IntWithAggregatesFilter<"User"> | number
    firstName?: StringWithAggregatesFilter<"User"> | string
    userName?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
  }

  export type SenderCreateInput = {
    fullName: string
    position: string
    department: string
    createdAt?: Date | string
    festival: FestivalCreateNestedOneWithoutSenderInput
    card: CardCreateNestedOneWithoutSenderInput
    wish: WisherCreateNestedOneWithoutSenderInput
  }

  export type SenderUncheckedCreateInput = {
    sId?: number
    fullName: string
    position: string
    department: string
    festivalId: number
    cardId: number
    wishId: number
    createdAt?: Date | string
  }

  export type SenderUpdateInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    festival?: FestivalUpdateOneRequiredWithoutSenderNestedInput
    card?: CardUpdateOneRequiredWithoutSenderNestedInput
    wish?: WisherUpdateOneRequiredWithoutSenderNestedInput
  }

  export type SenderUncheckedUpdateInput = {
    sId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    festivalId?: IntFieldUpdateOperationsInput | number
    cardId?: IntFieldUpdateOperationsInput | number
    wishId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SenderCreateManyInput = {
    fullName: string
    position: string
    department: string
    festivalId: number
    cardId: number
    wishId: number
    createdAt?: Date | string
  }

  export type SenderUpdateManyMutationInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SenderUncheckedUpdateManyInput = {
    sId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    festivalId?: IntFieldUpdateOperationsInput | number
    cardId?: IntFieldUpdateOperationsInput | number
    wishId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WisherCreateInput = {
    wishWord: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sender?: SenderCreateNestedManyWithoutWishInput
    festival: FestivalCreateNestedOneWithoutWisherInput
  }

  export type WisherUncheckedCreateInput = {
    wId?: number
    wishWord: string
    festivalId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sender?: SenderUncheckedCreateNestedManyWithoutWishInput
  }

  export type WisherUpdateInput = {
    wishWord?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sender?: SenderUpdateManyWithoutWishNestedInput
    festival?: FestivalUpdateOneRequiredWithoutWisherNestedInput
  }

  export type WisherUncheckedUpdateInput = {
    wId?: IntFieldUpdateOperationsInput | number
    wishWord?: StringFieldUpdateOperationsInput | string
    festivalId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sender?: SenderUncheckedUpdateManyWithoutWishNestedInput
  }

  export type WisherCreateManyInput = {
    wishWord: string
    festivalId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type WisherUpdateManyMutationInput = {
    wishWord?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WisherUncheckedUpdateManyInput = {
    wId?: IntFieldUpdateOperationsInput | number
    wishWord?: StringFieldUpdateOperationsInput | string
    festivalId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CardCreateInput = {
    imageCard: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    festival: FestivalCreateNestedOneWithoutCardInput
    sender?: SenderCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateInput = {
    cId?: number
    imageCard: string
    festivalId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sender?: SenderUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardUpdateInput = {
    imageCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    festival?: FestivalUpdateOneRequiredWithoutCardNestedInput
    sender?: SenderUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateInput = {
    cId?: IntFieldUpdateOperationsInput | number
    imageCard?: StringFieldUpdateOperationsInput | string
    festivalId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sender?: SenderUncheckedUpdateManyWithoutCardNestedInput
  }

  export type CardCreateManyInput = {
    imageCard: string
    festivalId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type CardUpdateManyMutationInput = {
    imageCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CardUncheckedUpdateManyInput = {
    cId?: IntFieldUpdateOperationsInput | number
    imageCard?: StringFieldUpdateOperationsInput | string
    festivalId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FestivalCreateInput = {
    festivalName: string
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    card?: CardCreateNestedManyWithoutFestivalInput
    wisher?: WisherCreateNestedManyWithoutFestivalInput
    sender?: SenderCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUncheckedCreateInput = {
    fId?: number
    festivalName: string
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    card?: CardUncheckedCreateNestedManyWithoutFestivalInput
    wisher?: WisherUncheckedCreateNestedManyWithoutFestivalInput
    sender?: SenderUncheckedCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUpdateInput = {
    festivalName?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    card?: CardUpdateManyWithoutFestivalNestedInput
    wisher?: WisherUpdateManyWithoutFestivalNestedInput
    sender?: SenderUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateInput = {
    fId?: IntFieldUpdateOperationsInput | number
    festivalName?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    card?: CardUncheckedUpdateManyWithoutFestivalNestedInput
    wisher?: WisherUncheckedUpdateManyWithoutFestivalNestedInput
    sender?: SenderUncheckedUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalCreateManyInput = {
    festivalName: string
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type FestivalUpdateManyMutationInput = {
    festivalName?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FestivalUncheckedUpdateManyInput = {
    fId?: IntFieldUpdateOperationsInput | number
    festivalName?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UnpoliteCreateInput = {
    word: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UnpoliteUncheckedCreateInput = {
    upId?: number
    word: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UnpoliteUpdateInput = {
    word?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UnpoliteUncheckedUpdateInput = {
    upId?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UnpoliteCreateManyInput = {
    word: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UnpoliteUpdateManyMutationInput = {
    word?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UnpoliteUncheckedUpdateManyInput = {
    upId?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateInput = {
    firstName: string
    userName: string
    password: string
  }

  export type UserUncheckedCreateInput = {
    uId?: number
    firstName: string
    userName: string
    password: string
  }

  export type UserUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateInput = {
    uId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateManyInput = {
    firstName: string
    userName: string
    password: string
  }

  export type UserUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    uId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FestivalScalarRelationFilter = {
    is?: FestivalWhereInput
    isNot?: FestivalWhereInput
  }

  export type CardScalarRelationFilter = {
    is?: CardWhereInput
    isNot?: CardWhereInput
  }

  export type WisherScalarRelationFilter = {
    is?: WisherWhereInput
    isNot?: WisherWhereInput
  }

  export type SenderCountOrderByAggregateInput = {
    sId?: SortOrder
    fullName?: SortOrder
    position?: SortOrder
    department?: SortOrder
    festivalId?: SortOrder
    cardId?: SortOrder
    wishId?: SortOrder
    createdAt?: SortOrder
  }

  export type SenderAvgOrderByAggregateInput = {
    sId?: SortOrder
    festivalId?: SortOrder
    cardId?: SortOrder
    wishId?: SortOrder
  }

  export type SenderMaxOrderByAggregateInput = {
    sId?: SortOrder
    fullName?: SortOrder
    position?: SortOrder
    department?: SortOrder
    festivalId?: SortOrder
    cardId?: SortOrder
    wishId?: SortOrder
    createdAt?: SortOrder
  }

  export type SenderMinOrderByAggregateInput = {
    sId?: SortOrder
    fullName?: SortOrder
    position?: SortOrder
    department?: SortOrder
    festivalId?: SortOrder
    cardId?: SortOrder
    wishId?: SortOrder
    createdAt?: SortOrder
  }

  export type SenderSumOrderByAggregateInput = {
    sId?: SortOrder
    festivalId?: SortOrder
    cardId?: SortOrder
    wishId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SenderListRelationFilter = {
    every?: SenderWhereInput
    some?: SenderWhereInput
    none?: SenderWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SenderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WisherCountOrderByAggregateInput = {
    wId?: SortOrder
    wishWord?: SortOrder
    festivalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type WisherAvgOrderByAggregateInput = {
    wId?: SortOrder
    festivalId?: SortOrder
  }

  export type WisherMaxOrderByAggregateInput = {
    wId?: SortOrder
    wishWord?: SortOrder
    festivalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type WisherMinOrderByAggregateInput = {
    wId?: SortOrder
    wishWord?: SortOrder
    festivalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type WisherSumOrderByAggregateInput = {
    wId?: SortOrder
    festivalId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CardCountOrderByAggregateInput = {
    cId?: SortOrder
    imageCard?: SortOrder
    festivalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type CardAvgOrderByAggregateInput = {
    cId?: SortOrder
    festivalId?: SortOrder
  }

  export type CardMaxOrderByAggregateInput = {
    cId?: SortOrder
    imageCard?: SortOrder
    festivalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type CardMinOrderByAggregateInput = {
    cId?: SortOrder
    imageCard?: SortOrder
    festivalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type CardSumOrderByAggregateInput = {
    cId?: SortOrder
    festivalId?: SortOrder
  }

  export type CardListRelationFilter = {
    every?: CardWhereInput
    some?: CardWhereInput
    none?: CardWhereInput
  }

  export type WisherListRelationFilter = {
    every?: WisherWhereInput
    some?: WisherWhereInput
    none?: WisherWhereInput
  }

  export type CardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WisherOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FestivalCountOrderByAggregateInput = {
    fId?: SortOrder
    festivalName?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type FestivalAvgOrderByAggregateInput = {
    fId?: SortOrder
  }

  export type FestivalMaxOrderByAggregateInput = {
    fId?: SortOrder
    festivalName?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type FestivalMinOrderByAggregateInput = {
    fId?: SortOrder
    festivalName?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type FestivalSumOrderByAggregateInput = {
    fId?: SortOrder
  }

  export type UnpoliteCountOrderByAggregateInput = {
    upId?: SortOrder
    word?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UnpoliteAvgOrderByAggregateInput = {
    upId?: SortOrder
  }

  export type UnpoliteMaxOrderByAggregateInput = {
    upId?: SortOrder
    word?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UnpoliteMinOrderByAggregateInput = {
    upId?: SortOrder
    word?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UnpoliteSumOrderByAggregateInput = {
    upId?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    uId?: SortOrder
    firstName?: SortOrder
    userName?: SortOrder
    password?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    uId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    uId?: SortOrder
    firstName?: SortOrder
    userName?: SortOrder
    password?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    uId?: SortOrder
    firstName?: SortOrder
    userName?: SortOrder
    password?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    uId?: SortOrder
  }

  export type FestivalCreateNestedOneWithoutSenderInput = {
    create?: XOR<FestivalCreateWithoutSenderInput, FestivalUncheckedCreateWithoutSenderInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutSenderInput
    connect?: FestivalWhereUniqueInput
  }

  export type CardCreateNestedOneWithoutSenderInput = {
    create?: XOR<CardCreateWithoutSenderInput, CardUncheckedCreateWithoutSenderInput>
    connectOrCreate?: CardCreateOrConnectWithoutSenderInput
    connect?: CardWhereUniqueInput
  }

  export type WisherCreateNestedOneWithoutSenderInput = {
    create?: XOR<WisherCreateWithoutSenderInput, WisherUncheckedCreateWithoutSenderInput>
    connectOrCreate?: WisherCreateOrConnectWithoutSenderInput
    connect?: WisherWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FestivalUpdateOneRequiredWithoutSenderNestedInput = {
    create?: XOR<FestivalCreateWithoutSenderInput, FestivalUncheckedCreateWithoutSenderInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutSenderInput
    upsert?: FestivalUpsertWithoutSenderInput
    connect?: FestivalWhereUniqueInput
    update?: XOR<XOR<FestivalUpdateToOneWithWhereWithoutSenderInput, FestivalUpdateWithoutSenderInput>, FestivalUncheckedUpdateWithoutSenderInput>
  }

  export type CardUpdateOneRequiredWithoutSenderNestedInput = {
    create?: XOR<CardCreateWithoutSenderInput, CardUncheckedCreateWithoutSenderInput>
    connectOrCreate?: CardCreateOrConnectWithoutSenderInput
    upsert?: CardUpsertWithoutSenderInput
    connect?: CardWhereUniqueInput
    update?: XOR<XOR<CardUpdateToOneWithWhereWithoutSenderInput, CardUpdateWithoutSenderInput>, CardUncheckedUpdateWithoutSenderInput>
  }

  export type WisherUpdateOneRequiredWithoutSenderNestedInput = {
    create?: XOR<WisherCreateWithoutSenderInput, WisherUncheckedCreateWithoutSenderInput>
    connectOrCreate?: WisherCreateOrConnectWithoutSenderInput
    upsert?: WisherUpsertWithoutSenderInput
    connect?: WisherWhereUniqueInput
    update?: XOR<XOR<WisherUpdateToOneWithWhereWithoutSenderInput, WisherUpdateWithoutSenderInput>, WisherUncheckedUpdateWithoutSenderInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SenderCreateNestedManyWithoutWishInput = {
    create?: XOR<SenderCreateWithoutWishInput, SenderUncheckedCreateWithoutWishInput> | SenderCreateWithoutWishInput[] | SenderUncheckedCreateWithoutWishInput[]
    connectOrCreate?: SenderCreateOrConnectWithoutWishInput | SenderCreateOrConnectWithoutWishInput[]
    createMany?: SenderCreateManyWishInputEnvelope
    connect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
  }

  export type FestivalCreateNestedOneWithoutWisherInput = {
    create?: XOR<FestivalCreateWithoutWisherInput, FestivalUncheckedCreateWithoutWisherInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutWisherInput
    connect?: FestivalWhereUniqueInput
  }

  export type SenderUncheckedCreateNestedManyWithoutWishInput = {
    create?: XOR<SenderCreateWithoutWishInput, SenderUncheckedCreateWithoutWishInput> | SenderCreateWithoutWishInput[] | SenderUncheckedCreateWithoutWishInput[]
    connectOrCreate?: SenderCreateOrConnectWithoutWishInput | SenderCreateOrConnectWithoutWishInput[]
    createMany?: SenderCreateManyWishInputEnvelope
    connect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type SenderUpdateManyWithoutWishNestedInput = {
    create?: XOR<SenderCreateWithoutWishInput, SenderUncheckedCreateWithoutWishInput> | SenderCreateWithoutWishInput[] | SenderUncheckedCreateWithoutWishInput[]
    connectOrCreate?: SenderCreateOrConnectWithoutWishInput | SenderCreateOrConnectWithoutWishInput[]
    upsert?: SenderUpsertWithWhereUniqueWithoutWishInput | SenderUpsertWithWhereUniqueWithoutWishInput[]
    createMany?: SenderCreateManyWishInputEnvelope
    set?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    disconnect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    delete?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    connect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    update?: SenderUpdateWithWhereUniqueWithoutWishInput | SenderUpdateWithWhereUniqueWithoutWishInput[]
    updateMany?: SenderUpdateManyWithWhereWithoutWishInput | SenderUpdateManyWithWhereWithoutWishInput[]
    deleteMany?: SenderScalarWhereInput | SenderScalarWhereInput[]
  }

  export type FestivalUpdateOneRequiredWithoutWisherNestedInput = {
    create?: XOR<FestivalCreateWithoutWisherInput, FestivalUncheckedCreateWithoutWisherInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutWisherInput
    upsert?: FestivalUpsertWithoutWisherInput
    connect?: FestivalWhereUniqueInput
    update?: XOR<XOR<FestivalUpdateToOneWithWhereWithoutWisherInput, FestivalUpdateWithoutWisherInput>, FestivalUncheckedUpdateWithoutWisherInput>
  }

  export type SenderUncheckedUpdateManyWithoutWishNestedInput = {
    create?: XOR<SenderCreateWithoutWishInput, SenderUncheckedCreateWithoutWishInput> | SenderCreateWithoutWishInput[] | SenderUncheckedCreateWithoutWishInput[]
    connectOrCreate?: SenderCreateOrConnectWithoutWishInput | SenderCreateOrConnectWithoutWishInput[]
    upsert?: SenderUpsertWithWhereUniqueWithoutWishInput | SenderUpsertWithWhereUniqueWithoutWishInput[]
    createMany?: SenderCreateManyWishInputEnvelope
    set?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    disconnect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    delete?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    connect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    update?: SenderUpdateWithWhereUniqueWithoutWishInput | SenderUpdateWithWhereUniqueWithoutWishInput[]
    updateMany?: SenderUpdateManyWithWhereWithoutWishInput | SenderUpdateManyWithWhereWithoutWishInput[]
    deleteMany?: SenderScalarWhereInput | SenderScalarWhereInput[]
  }

  export type FestivalCreateNestedOneWithoutCardInput = {
    create?: XOR<FestivalCreateWithoutCardInput, FestivalUncheckedCreateWithoutCardInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutCardInput
    connect?: FestivalWhereUniqueInput
  }

  export type SenderCreateNestedManyWithoutCardInput = {
    create?: XOR<SenderCreateWithoutCardInput, SenderUncheckedCreateWithoutCardInput> | SenderCreateWithoutCardInput[] | SenderUncheckedCreateWithoutCardInput[]
    connectOrCreate?: SenderCreateOrConnectWithoutCardInput | SenderCreateOrConnectWithoutCardInput[]
    createMany?: SenderCreateManyCardInputEnvelope
    connect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
  }

  export type SenderUncheckedCreateNestedManyWithoutCardInput = {
    create?: XOR<SenderCreateWithoutCardInput, SenderUncheckedCreateWithoutCardInput> | SenderCreateWithoutCardInput[] | SenderUncheckedCreateWithoutCardInput[]
    connectOrCreate?: SenderCreateOrConnectWithoutCardInput | SenderCreateOrConnectWithoutCardInput[]
    createMany?: SenderCreateManyCardInputEnvelope
    connect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
  }

  export type FestivalUpdateOneRequiredWithoutCardNestedInput = {
    create?: XOR<FestivalCreateWithoutCardInput, FestivalUncheckedCreateWithoutCardInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutCardInput
    upsert?: FestivalUpsertWithoutCardInput
    connect?: FestivalWhereUniqueInput
    update?: XOR<XOR<FestivalUpdateToOneWithWhereWithoutCardInput, FestivalUpdateWithoutCardInput>, FestivalUncheckedUpdateWithoutCardInput>
  }

  export type SenderUpdateManyWithoutCardNestedInput = {
    create?: XOR<SenderCreateWithoutCardInput, SenderUncheckedCreateWithoutCardInput> | SenderCreateWithoutCardInput[] | SenderUncheckedCreateWithoutCardInput[]
    connectOrCreate?: SenderCreateOrConnectWithoutCardInput | SenderCreateOrConnectWithoutCardInput[]
    upsert?: SenderUpsertWithWhereUniqueWithoutCardInput | SenderUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: SenderCreateManyCardInputEnvelope
    set?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    disconnect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    delete?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    connect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    update?: SenderUpdateWithWhereUniqueWithoutCardInput | SenderUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: SenderUpdateManyWithWhereWithoutCardInput | SenderUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: SenderScalarWhereInput | SenderScalarWhereInput[]
  }

  export type SenderUncheckedUpdateManyWithoutCardNestedInput = {
    create?: XOR<SenderCreateWithoutCardInput, SenderUncheckedCreateWithoutCardInput> | SenderCreateWithoutCardInput[] | SenderUncheckedCreateWithoutCardInput[]
    connectOrCreate?: SenderCreateOrConnectWithoutCardInput | SenderCreateOrConnectWithoutCardInput[]
    upsert?: SenderUpsertWithWhereUniqueWithoutCardInput | SenderUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: SenderCreateManyCardInputEnvelope
    set?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    disconnect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    delete?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    connect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    update?: SenderUpdateWithWhereUniqueWithoutCardInput | SenderUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: SenderUpdateManyWithWhereWithoutCardInput | SenderUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: SenderScalarWhereInput | SenderScalarWhereInput[]
  }

  export type CardCreateNestedManyWithoutFestivalInput = {
    create?: XOR<CardCreateWithoutFestivalInput, CardUncheckedCreateWithoutFestivalInput> | CardCreateWithoutFestivalInput[] | CardUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: CardCreateOrConnectWithoutFestivalInput | CardCreateOrConnectWithoutFestivalInput[]
    createMany?: CardCreateManyFestivalInputEnvelope
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
  }

  export type WisherCreateNestedManyWithoutFestivalInput = {
    create?: XOR<WisherCreateWithoutFestivalInput, WisherUncheckedCreateWithoutFestivalInput> | WisherCreateWithoutFestivalInput[] | WisherUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: WisherCreateOrConnectWithoutFestivalInput | WisherCreateOrConnectWithoutFestivalInput[]
    createMany?: WisherCreateManyFestivalInputEnvelope
    connect?: WisherWhereUniqueInput | WisherWhereUniqueInput[]
  }

  export type SenderCreateNestedManyWithoutFestivalInput = {
    create?: XOR<SenderCreateWithoutFestivalInput, SenderUncheckedCreateWithoutFestivalInput> | SenderCreateWithoutFestivalInput[] | SenderUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: SenderCreateOrConnectWithoutFestivalInput | SenderCreateOrConnectWithoutFestivalInput[]
    createMany?: SenderCreateManyFestivalInputEnvelope
    connect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
  }

  export type CardUncheckedCreateNestedManyWithoutFestivalInput = {
    create?: XOR<CardCreateWithoutFestivalInput, CardUncheckedCreateWithoutFestivalInput> | CardCreateWithoutFestivalInput[] | CardUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: CardCreateOrConnectWithoutFestivalInput | CardCreateOrConnectWithoutFestivalInput[]
    createMany?: CardCreateManyFestivalInputEnvelope
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
  }

  export type WisherUncheckedCreateNestedManyWithoutFestivalInput = {
    create?: XOR<WisherCreateWithoutFestivalInput, WisherUncheckedCreateWithoutFestivalInput> | WisherCreateWithoutFestivalInput[] | WisherUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: WisherCreateOrConnectWithoutFestivalInput | WisherCreateOrConnectWithoutFestivalInput[]
    createMany?: WisherCreateManyFestivalInputEnvelope
    connect?: WisherWhereUniqueInput | WisherWhereUniqueInput[]
  }

  export type SenderUncheckedCreateNestedManyWithoutFestivalInput = {
    create?: XOR<SenderCreateWithoutFestivalInput, SenderUncheckedCreateWithoutFestivalInput> | SenderCreateWithoutFestivalInput[] | SenderUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: SenderCreateOrConnectWithoutFestivalInput | SenderCreateOrConnectWithoutFestivalInput[]
    createMany?: SenderCreateManyFestivalInputEnvelope
    connect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
  }

  export type CardUpdateManyWithoutFestivalNestedInput = {
    create?: XOR<CardCreateWithoutFestivalInput, CardUncheckedCreateWithoutFestivalInput> | CardCreateWithoutFestivalInput[] | CardUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: CardCreateOrConnectWithoutFestivalInput | CardCreateOrConnectWithoutFestivalInput[]
    upsert?: CardUpsertWithWhereUniqueWithoutFestivalInput | CardUpsertWithWhereUniqueWithoutFestivalInput[]
    createMany?: CardCreateManyFestivalInputEnvelope
    set?: CardWhereUniqueInput | CardWhereUniqueInput[]
    disconnect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    delete?: CardWhereUniqueInput | CardWhereUniqueInput[]
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    update?: CardUpdateWithWhereUniqueWithoutFestivalInput | CardUpdateWithWhereUniqueWithoutFestivalInput[]
    updateMany?: CardUpdateManyWithWhereWithoutFestivalInput | CardUpdateManyWithWhereWithoutFestivalInput[]
    deleteMany?: CardScalarWhereInput | CardScalarWhereInput[]
  }

  export type WisherUpdateManyWithoutFestivalNestedInput = {
    create?: XOR<WisherCreateWithoutFestivalInput, WisherUncheckedCreateWithoutFestivalInput> | WisherCreateWithoutFestivalInput[] | WisherUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: WisherCreateOrConnectWithoutFestivalInput | WisherCreateOrConnectWithoutFestivalInput[]
    upsert?: WisherUpsertWithWhereUniqueWithoutFestivalInput | WisherUpsertWithWhereUniqueWithoutFestivalInput[]
    createMany?: WisherCreateManyFestivalInputEnvelope
    set?: WisherWhereUniqueInput | WisherWhereUniqueInput[]
    disconnect?: WisherWhereUniqueInput | WisherWhereUniqueInput[]
    delete?: WisherWhereUniqueInput | WisherWhereUniqueInput[]
    connect?: WisherWhereUniqueInput | WisherWhereUniqueInput[]
    update?: WisherUpdateWithWhereUniqueWithoutFestivalInput | WisherUpdateWithWhereUniqueWithoutFestivalInput[]
    updateMany?: WisherUpdateManyWithWhereWithoutFestivalInput | WisherUpdateManyWithWhereWithoutFestivalInput[]
    deleteMany?: WisherScalarWhereInput | WisherScalarWhereInput[]
  }

  export type SenderUpdateManyWithoutFestivalNestedInput = {
    create?: XOR<SenderCreateWithoutFestivalInput, SenderUncheckedCreateWithoutFestivalInput> | SenderCreateWithoutFestivalInput[] | SenderUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: SenderCreateOrConnectWithoutFestivalInput | SenderCreateOrConnectWithoutFestivalInput[]
    upsert?: SenderUpsertWithWhereUniqueWithoutFestivalInput | SenderUpsertWithWhereUniqueWithoutFestivalInput[]
    createMany?: SenderCreateManyFestivalInputEnvelope
    set?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    disconnect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    delete?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    connect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    update?: SenderUpdateWithWhereUniqueWithoutFestivalInput | SenderUpdateWithWhereUniqueWithoutFestivalInput[]
    updateMany?: SenderUpdateManyWithWhereWithoutFestivalInput | SenderUpdateManyWithWhereWithoutFestivalInput[]
    deleteMany?: SenderScalarWhereInput | SenderScalarWhereInput[]
  }

  export type CardUncheckedUpdateManyWithoutFestivalNestedInput = {
    create?: XOR<CardCreateWithoutFestivalInput, CardUncheckedCreateWithoutFestivalInput> | CardCreateWithoutFestivalInput[] | CardUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: CardCreateOrConnectWithoutFestivalInput | CardCreateOrConnectWithoutFestivalInput[]
    upsert?: CardUpsertWithWhereUniqueWithoutFestivalInput | CardUpsertWithWhereUniqueWithoutFestivalInput[]
    createMany?: CardCreateManyFestivalInputEnvelope
    set?: CardWhereUniqueInput | CardWhereUniqueInput[]
    disconnect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    delete?: CardWhereUniqueInput | CardWhereUniqueInput[]
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    update?: CardUpdateWithWhereUniqueWithoutFestivalInput | CardUpdateWithWhereUniqueWithoutFestivalInput[]
    updateMany?: CardUpdateManyWithWhereWithoutFestivalInput | CardUpdateManyWithWhereWithoutFestivalInput[]
    deleteMany?: CardScalarWhereInput | CardScalarWhereInput[]
  }

  export type WisherUncheckedUpdateManyWithoutFestivalNestedInput = {
    create?: XOR<WisherCreateWithoutFestivalInput, WisherUncheckedCreateWithoutFestivalInput> | WisherCreateWithoutFestivalInput[] | WisherUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: WisherCreateOrConnectWithoutFestivalInput | WisherCreateOrConnectWithoutFestivalInput[]
    upsert?: WisherUpsertWithWhereUniqueWithoutFestivalInput | WisherUpsertWithWhereUniqueWithoutFestivalInput[]
    createMany?: WisherCreateManyFestivalInputEnvelope
    set?: WisherWhereUniqueInput | WisherWhereUniqueInput[]
    disconnect?: WisherWhereUniqueInput | WisherWhereUniqueInput[]
    delete?: WisherWhereUniqueInput | WisherWhereUniqueInput[]
    connect?: WisherWhereUniqueInput | WisherWhereUniqueInput[]
    update?: WisherUpdateWithWhereUniqueWithoutFestivalInput | WisherUpdateWithWhereUniqueWithoutFestivalInput[]
    updateMany?: WisherUpdateManyWithWhereWithoutFestivalInput | WisherUpdateManyWithWhereWithoutFestivalInput[]
    deleteMany?: WisherScalarWhereInput | WisherScalarWhereInput[]
  }

  export type SenderUncheckedUpdateManyWithoutFestivalNestedInput = {
    create?: XOR<SenderCreateWithoutFestivalInput, SenderUncheckedCreateWithoutFestivalInput> | SenderCreateWithoutFestivalInput[] | SenderUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: SenderCreateOrConnectWithoutFestivalInput | SenderCreateOrConnectWithoutFestivalInput[]
    upsert?: SenderUpsertWithWhereUniqueWithoutFestivalInput | SenderUpsertWithWhereUniqueWithoutFestivalInput[]
    createMany?: SenderCreateManyFestivalInputEnvelope
    set?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    disconnect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    delete?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    connect?: SenderWhereUniqueInput | SenderWhereUniqueInput[]
    update?: SenderUpdateWithWhereUniqueWithoutFestivalInput | SenderUpdateWithWhereUniqueWithoutFestivalInput[]
    updateMany?: SenderUpdateManyWithWhereWithoutFestivalInput | SenderUpdateManyWithWhereWithoutFestivalInput[]
    deleteMany?: SenderScalarWhereInput | SenderScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FestivalCreateWithoutSenderInput = {
    festivalName: string
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    card?: CardCreateNestedManyWithoutFestivalInput
    wisher?: WisherCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUncheckedCreateWithoutSenderInput = {
    fId?: number
    festivalName: string
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    card?: CardUncheckedCreateNestedManyWithoutFestivalInput
    wisher?: WisherUncheckedCreateNestedManyWithoutFestivalInput
  }

  export type FestivalCreateOrConnectWithoutSenderInput = {
    where: FestivalWhereUniqueInput
    create: XOR<FestivalCreateWithoutSenderInput, FestivalUncheckedCreateWithoutSenderInput>
  }

  export type CardCreateWithoutSenderInput = {
    imageCard: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    festival: FestivalCreateNestedOneWithoutCardInput
  }

  export type CardUncheckedCreateWithoutSenderInput = {
    cId?: number
    imageCard: string
    festivalId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type CardCreateOrConnectWithoutSenderInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutSenderInput, CardUncheckedCreateWithoutSenderInput>
  }

  export type WisherCreateWithoutSenderInput = {
    wishWord: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    festival: FestivalCreateNestedOneWithoutWisherInput
  }

  export type WisherUncheckedCreateWithoutSenderInput = {
    wId?: number
    wishWord: string
    festivalId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type WisherCreateOrConnectWithoutSenderInput = {
    where: WisherWhereUniqueInput
    create: XOR<WisherCreateWithoutSenderInput, WisherUncheckedCreateWithoutSenderInput>
  }

  export type FestivalUpsertWithoutSenderInput = {
    update: XOR<FestivalUpdateWithoutSenderInput, FestivalUncheckedUpdateWithoutSenderInput>
    create: XOR<FestivalCreateWithoutSenderInput, FestivalUncheckedCreateWithoutSenderInput>
    where?: FestivalWhereInput
  }

  export type FestivalUpdateToOneWithWhereWithoutSenderInput = {
    where?: FestivalWhereInput
    data: XOR<FestivalUpdateWithoutSenderInput, FestivalUncheckedUpdateWithoutSenderInput>
  }

  export type FestivalUpdateWithoutSenderInput = {
    festivalName?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    card?: CardUpdateManyWithoutFestivalNestedInput
    wisher?: WisherUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateWithoutSenderInput = {
    fId?: IntFieldUpdateOperationsInput | number
    festivalName?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    card?: CardUncheckedUpdateManyWithoutFestivalNestedInput
    wisher?: WisherUncheckedUpdateManyWithoutFestivalNestedInput
  }

  export type CardUpsertWithoutSenderInput = {
    update: XOR<CardUpdateWithoutSenderInput, CardUncheckedUpdateWithoutSenderInput>
    create: XOR<CardCreateWithoutSenderInput, CardUncheckedCreateWithoutSenderInput>
    where?: CardWhereInput
  }

  export type CardUpdateToOneWithWhereWithoutSenderInput = {
    where?: CardWhereInput
    data: XOR<CardUpdateWithoutSenderInput, CardUncheckedUpdateWithoutSenderInput>
  }

  export type CardUpdateWithoutSenderInput = {
    imageCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    festival?: FestivalUpdateOneRequiredWithoutCardNestedInput
  }

  export type CardUncheckedUpdateWithoutSenderInput = {
    cId?: IntFieldUpdateOperationsInput | number
    imageCard?: StringFieldUpdateOperationsInput | string
    festivalId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WisherUpsertWithoutSenderInput = {
    update: XOR<WisherUpdateWithoutSenderInput, WisherUncheckedUpdateWithoutSenderInput>
    create: XOR<WisherCreateWithoutSenderInput, WisherUncheckedCreateWithoutSenderInput>
    where?: WisherWhereInput
  }

  export type WisherUpdateToOneWithWhereWithoutSenderInput = {
    where?: WisherWhereInput
    data: XOR<WisherUpdateWithoutSenderInput, WisherUncheckedUpdateWithoutSenderInput>
  }

  export type WisherUpdateWithoutSenderInput = {
    wishWord?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    festival?: FestivalUpdateOneRequiredWithoutWisherNestedInput
  }

  export type WisherUncheckedUpdateWithoutSenderInput = {
    wId?: IntFieldUpdateOperationsInput | number
    wishWord?: StringFieldUpdateOperationsInput | string
    festivalId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SenderCreateWithoutWishInput = {
    fullName: string
    position: string
    department: string
    createdAt?: Date | string
    festival: FestivalCreateNestedOneWithoutSenderInput
    card: CardCreateNestedOneWithoutSenderInput
  }

  export type SenderUncheckedCreateWithoutWishInput = {
    sId?: number
    fullName: string
    position: string
    department: string
    festivalId: number
    cardId: number
    createdAt?: Date | string
  }

  export type SenderCreateOrConnectWithoutWishInput = {
    where: SenderWhereUniqueInput
    create: XOR<SenderCreateWithoutWishInput, SenderUncheckedCreateWithoutWishInput>
  }

  export type SenderCreateManyWishInputEnvelope = {
    data: SenderCreateManyWishInput | SenderCreateManyWishInput[]
  }

  export type FestivalCreateWithoutWisherInput = {
    festivalName: string
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    card?: CardCreateNestedManyWithoutFestivalInput
    sender?: SenderCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUncheckedCreateWithoutWisherInput = {
    fId?: number
    festivalName: string
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    card?: CardUncheckedCreateNestedManyWithoutFestivalInput
    sender?: SenderUncheckedCreateNestedManyWithoutFestivalInput
  }

  export type FestivalCreateOrConnectWithoutWisherInput = {
    where: FestivalWhereUniqueInput
    create: XOR<FestivalCreateWithoutWisherInput, FestivalUncheckedCreateWithoutWisherInput>
  }

  export type SenderUpsertWithWhereUniqueWithoutWishInput = {
    where: SenderWhereUniqueInput
    update: XOR<SenderUpdateWithoutWishInput, SenderUncheckedUpdateWithoutWishInput>
    create: XOR<SenderCreateWithoutWishInput, SenderUncheckedCreateWithoutWishInput>
  }

  export type SenderUpdateWithWhereUniqueWithoutWishInput = {
    where: SenderWhereUniqueInput
    data: XOR<SenderUpdateWithoutWishInput, SenderUncheckedUpdateWithoutWishInput>
  }

  export type SenderUpdateManyWithWhereWithoutWishInput = {
    where: SenderScalarWhereInput
    data: XOR<SenderUpdateManyMutationInput, SenderUncheckedUpdateManyWithoutWishInput>
  }

  export type SenderScalarWhereInput = {
    AND?: SenderScalarWhereInput | SenderScalarWhereInput[]
    OR?: SenderScalarWhereInput[]
    NOT?: SenderScalarWhereInput | SenderScalarWhereInput[]
    sId?: IntFilter<"Sender"> | number
    fullName?: StringFilter<"Sender"> | string
    position?: StringFilter<"Sender"> | string
    department?: StringFilter<"Sender"> | string
    festivalId?: IntFilter<"Sender"> | number
    cardId?: IntFilter<"Sender"> | number
    wishId?: IntFilter<"Sender"> | number
    createdAt?: DateTimeFilter<"Sender"> | Date | string
  }

  export type FestivalUpsertWithoutWisherInput = {
    update: XOR<FestivalUpdateWithoutWisherInput, FestivalUncheckedUpdateWithoutWisherInput>
    create: XOR<FestivalCreateWithoutWisherInput, FestivalUncheckedCreateWithoutWisherInput>
    where?: FestivalWhereInput
  }

  export type FestivalUpdateToOneWithWhereWithoutWisherInput = {
    where?: FestivalWhereInput
    data: XOR<FestivalUpdateWithoutWisherInput, FestivalUncheckedUpdateWithoutWisherInput>
  }

  export type FestivalUpdateWithoutWisherInput = {
    festivalName?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    card?: CardUpdateManyWithoutFestivalNestedInput
    sender?: SenderUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateWithoutWisherInput = {
    fId?: IntFieldUpdateOperationsInput | number
    festivalName?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    card?: CardUncheckedUpdateManyWithoutFestivalNestedInput
    sender?: SenderUncheckedUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalCreateWithoutCardInput = {
    festivalName: string
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wisher?: WisherCreateNestedManyWithoutFestivalInput
    sender?: SenderCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUncheckedCreateWithoutCardInput = {
    fId?: number
    festivalName: string
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wisher?: WisherUncheckedCreateNestedManyWithoutFestivalInput
    sender?: SenderUncheckedCreateNestedManyWithoutFestivalInput
  }

  export type FestivalCreateOrConnectWithoutCardInput = {
    where: FestivalWhereUniqueInput
    create: XOR<FestivalCreateWithoutCardInput, FestivalUncheckedCreateWithoutCardInput>
  }

  export type SenderCreateWithoutCardInput = {
    fullName: string
    position: string
    department: string
    createdAt?: Date | string
    festival: FestivalCreateNestedOneWithoutSenderInput
    wish: WisherCreateNestedOneWithoutSenderInput
  }

  export type SenderUncheckedCreateWithoutCardInput = {
    sId?: number
    fullName: string
    position: string
    department: string
    festivalId: number
    wishId: number
    createdAt?: Date | string
  }

  export type SenderCreateOrConnectWithoutCardInput = {
    where: SenderWhereUniqueInput
    create: XOR<SenderCreateWithoutCardInput, SenderUncheckedCreateWithoutCardInput>
  }

  export type SenderCreateManyCardInputEnvelope = {
    data: SenderCreateManyCardInput | SenderCreateManyCardInput[]
  }

  export type FestivalUpsertWithoutCardInput = {
    update: XOR<FestivalUpdateWithoutCardInput, FestivalUncheckedUpdateWithoutCardInput>
    create: XOR<FestivalCreateWithoutCardInput, FestivalUncheckedCreateWithoutCardInput>
    where?: FestivalWhereInput
  }

  export type FestivalUpdateToOneWithWhereWithoutCardInput = {
    where?: FestivalWhereInput
    data: XOR<FestivalUpdateWithoutCardInput, FestivalUncheckedUpdateWithoutCardInput>
  }

  export type FestivalUpdateWithoutCardInput = {
    festivalName?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wisher?: WisherUpdateManyWithoutFestivalNestedInput
    sender?: SenderUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateWithoutCardInput = {
    fId?: IntFieldUpdateOperationsInput | number
    festivalName?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wisher?: WisherUncheckedUpdateManyWithoutFestivalNestedInput
    sender?: SenderUncheckedUpdateManyWithoutFestivalNestedInput
  }

  export type SenderUpsertWithWhereUniqueWithoutCardInput = {
    where: SenderWhereUniqueInput
    update: XOR<SenderUpdateWithoutCardInput, SenderUncheckedUpdateWithoutCardInput>
    create: XOR<SenderCreateWithoutCardInput, SenderUncheckedCreateWithoutCardInput>
  }

  export type SenderUpdateWithWhereUniqueWithoutCardInput = {
    where: SenderWhereUniqueInput
    data: XOR<SenderUpdateWithoutCardInput, SenderUncheckedUpdateWithoutCardInput>
  }

  export type SenderUpdateManyWithWhereWithoutCardInput = {
    where: SenderScalarWhereInput
    data: XOR<SenderUpdateManyMutationInput, SenderUncheckedUpdateManyWithoutCardInput>
  }

  export type CardCreateWithoutFestivalInput = {
    imageCard: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sender?: SenderCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateWithoutFestivalInput = {
    cId?: number
    imageCard: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sender?: SenderUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardCreateOrConnectWithoutFestivalInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutFestivalInput, CardUncheckedCreateWithoutFestivalInput>
  }

  export type CardCreateManyFestivalInputEnvelope = {
    data: CardCreateManyFestivalInput | CardCreateManyFestivalInput[]
  }

  export type WisherCreateWithoutFestivalInput = {
    wishWord: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sender?: SenderCreateNestedManyWithoutWishInput
  }

  export type WisherUncheckedCreateWithoutFestivalInput = {
    wId?: number
    wishWord: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sender?: SenderUncheckedCreateNestedManyWithoutWishInput
  }

  export type WisherCreateOrConnectWithoutFestivalInput = {
    where: WisherWhereUniqueInput
    create: XOR<WisherCreateWithoutFestivalInput, WisherUncheckedCreateWithoutFestivalInput>
  }

  export type WisherCreateManyFestivalInputEnvelope = {
    data: WisherCreateManyFestivalInput | WisherCreateManyFestivalInput[]
  }

  export type SenderCreateWithoutFestivalInput = {
    fullName: string
    position: string
    department: string
    createdAt?: Date | string
    card: CardCreateNestedOneWithoutSenderInput
    wish: WisherCreateNestedOneWithoutSenderInput
  }

  export type SenderUncheckedCreateWithoutFestivalInput = {
    sId?: number
    fullName: string
    position: string
    department: string
    cardId: number
    wishId: number
    createdAt?: Date | string
  }

  export type SenderCreateOrConnectWithoutFestivalInput = {
    where: SenderWhereUniqueInput
    create: XOR<SenderCreateWithoutFestivalInput, SenderUncheckedCreateWithoutFestivalInput>
  }

  export type SenderCreateManyFestivalInputEnvelope = {
    data: SenderCreateManyFestivalInput | SenderCreateManyFestivalInput[]
  }

  export type CardUpsertWithWhereUniqueWithoutFestivalInput = {
    where: CardWhereUniqueInput
    update: XOR<CardUpdateWithoutFestivalInput, CardUncheckedUpdateWithoutFestivalInput>
    create: XOR<CardCreateWithoutFestivalInput, CardUncheckedCreateWithoutFestivalInput>
  }

  export type CardUpdateWithWhereUniqueWithoutFestivalInput = {
    where: CardWhereUniqueInput
    data: XOR<CardUpdateWithoutFestivalInput, CardUncheckedUpdateWithoutFestivalInput>
  }

  export type CardUpdateManyWithWhereWithoutFestivalInput = {
    where: CardScalarWhereInput
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyWithoutFestivalInput>
  }

  export type CardScalarWhereInput = {
    AND?: CardScalarWhereInput | CardScalarWhereInput[]
    OR?: CardScalarWhereInput[]
    NOT?: CardScalarWhereInput | CardScalarWhereInput[]
    cId?: IntFilter<"Card"> | number
    imageCard?: StringFilter<"Card"> | string
    festivalId?: IntFilter<"Card"> | number
    createdAt?: DateTimeFilter<"Card"> | Date | string
    updatedAt?: DateTimeFilter<"Card"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Card"> | Date | string | null
  }

  export type WisherUpsertWithWhereUniqueWithoutFestivalInput = {
    where: WisherWhereUniqueInput
    update: XOR<WisherUpdateWithoutFestivalInput, WisherUncheckedUpdateWithoutFestivalInput>
    create: XOR<WisherCreateWithoutFestivalInput, WisherUncheckedCreateWithoutFestivalInput>
  }

  export type WisherUpdateWithWhereUniqueWithoutFestivalInput = {
    where: WisherWhereUniqueInput
    data: XOR<WisherUpdateWithoutFestivalInput, WisherUncheckedUpdateWithoutFestivalInput>
  }

  export type WisherUpdateManyWithWhereWithoutFestivalInput = {
    where: WisherScalarWhereInput
    data: XOR<WisherUpdateManyMutationInput, WisherUncheckedUpdateManyWithoutFestivalInput>
  }

  export type WisherScalarWhereInput = {
    AND?: WisherScalarWhereInput | WisherScalarWhereInput[]
    OR?: WisherScalarWhereInput[]
    NOT?: WisherScalarWhereInput | WisherScalarWhereInput[]
    wId?: IntFilter<"Wisher"> | number
    wishWord?: StringFilter<"Wisher"> | string
    festivalId?: IntFilter<"Wisher"> | number
    createdAt?: DateTimeFilter<"Wisher"> | Date | string
    updatedAt?: DateTimeFilter<"Wisher"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Wisher"> | Date | string | null
  }

  export type SenderUpsertWithWhereUniqueWithoutFestivalInput = {
    where: SenderWhereUniqueInput
    update: XOR<SenderUpdateWithoutFestivalInput, SenderUncheckedUpdateWithoutFestivalInput>
    create: XOR<SenderCreateWithoutFestivalInput, SenderUncheckedCreateWithoutFestivalInput>
  }

  export type SenderUpdateWithWhereUniqueWithoutFestivalInput = {
    where: SenderWhereUniqueInput
    data: XOR<SenderUpdateWithoutFestivalInput, SenderUncheckedUpdateWithoutFestivalInput>
  }

  export type SenderUpdateManyWithWhereWithoutFestivalInput = {
    where: SenderScalarWhereInput
    data: XOR<SenderUpdateManyMutationInput, SenderUncheckedUpdateManyWithoutFestivalInput>
  }

  export type SenderCreateManyWishInput = {
    fullName: string
    position: string
    department: string
    festivalId: number
    cardId: number
    createdAt?: Date | string
  }

  export type SenderUpdateWithoutWishInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    festival?: FestivalUpdateOneRequiredWithoutSenderNestedInput
    card?: CardUpdateOneRequiredWithoutSenderNestedInput
  }

  export type SenderUncheckedUpdateWithoutWishInput = {
    sId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    festivalId?: IntFieldUpdateOperationsInput | number
    cardId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SenderUncheckedUpdateManyWithoutWishInput = {
    sId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    festivalId?: IntFieldUpdateOperationsInput | number
    cardId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SenderCreateManyCardInput = {
    fullName: string
    position: string
    department: string
    festivalId: number
    wishId: number
    createdAt?: Date | string
  }

  export type SenderUpdateWithoutCardInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    festival?: FestivalUpdateOneRequiredWithoutSenderNestedInput
    wish?: WisherUpdateOneRequiredWithoutSenderNestedInput
  }

  export type SenderUncheckedUpdateWithoutCardInput = {
    sId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    festivalId?: IntFieldUpdateOperationsInput | number
    wishId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SenderUncheckedUpdateManyWithoutCardInput = {
    sId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    festivalId?: IntFieldUpdateOperationsInput | number
    wishId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardCreateManyFestivalInput = {
    imageCard: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type WisherCreateManyFestivalInput = {
    wishWord: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type SenderCreateManyFestivalInput = {
    fullName: string
    position: string
    department: string
    cardId: number
    wishId: number
    createdAt?: Date | string
  }

  export type CardUpdateWithoutFestivalInput = {
    imageCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sender?: SenderUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateWithoutFestivalInput = {
    cId?: IntFieldUpdateOperationsInput | number
    imageCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sender?: SenderUncheckedUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateManyWithoutFestivalInput = {
    cId?: IntFieldUpdateOperationsInput | number
    imageCard?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WisherUpdateWithoutFestivalInput = {
    wishWord?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sender?: SenderUpdateManyWithoutWishNestedInput
  }

  export type WisherUncheckedUpdateWithoutFestivalInput = {
    wId?: IntFieldUpdateOperationsInput | number
    wishWord?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sender?: SenderUncheckedUpdateManyWithoutWishNestedInput
  }

  export type WisherUncheckedUpdateManyWithoutFestivalInput = {
    wId?: IntFieldUpdateOperationsInput | number
    wishWord?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SenderUpdateWithoutFestivalInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    card?: CardUpdateOneRequiredWithoutSenderNestedInput
    wish?: WisherUpdateOneRequiredWithoutSenderNestedInput
  }

  export type SenderUncheckedUpdateWithoutFestivalInput = {
    sId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    cardId?: IntFieldUpdateOperationsInput | number
    wishId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SenderUncheckedUpdateManyWithoutFestivalInput = {
    sId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    cardId?: IntFieldUpdateOperationsInput | number
    wishId?: IntFieldUpdateOperationsInput | number
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