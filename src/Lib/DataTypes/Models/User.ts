export type commonModelType={
    timestamps?:Date
    isDeleted?:Boolean
}

export type userModelType<T=Record<string,any>>=T &{
     name:String
	 email:String
	 password:String
     token:String
}