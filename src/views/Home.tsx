export function Home() {
  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <div>
          <button
            onClick={e => {
              e.preventDefault()
              // @TODO: add signout func from supabase auth
            }}
            className={'button block'}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
