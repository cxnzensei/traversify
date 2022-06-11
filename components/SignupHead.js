const SignupHead = () => {
  return (
      <div className="bg-gray-100 w-full">
        <div className="font-semibold text-2xl flex flex-col items-start justify-center">
            <div className="px-10 lg:mt-24 my-16">
            <div className="max-w-[55ch]">
                This is not a real online service! You know you need something like this in 
                your life to help you realize your deepest dreams.
            </div>
            <div>
                Sign up <em>now</em> to get started.
            </div>
            <div className="mt-6">
                You <em>know</em> you want to
            </div>
            <div className="text-sm pt-6">Basic validations with password confirmation check have been added</div>
            </div>
        </div>

      </div>
  )
}

export default SignupHead
