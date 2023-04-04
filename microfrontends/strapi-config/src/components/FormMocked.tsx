import React from "react"

const FormMocked = () => {
  return (
    <>
      <div className="main-container bg-gray-100">
        <div className="top-container bg-white mb-10 p-10 border-b-black">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a>epc</a>
              </li>
              <li>
                <a>Strapi</a>
              </li>
              <li>Strappy config</li>
            </ul>
          </div>

          <h1>
            Strappy content
            <div className="tooltip tooltip-right" data-tip="testo da inserire">
              <button className="btn rounded-none">icona</button>
            </div>
          </h1>
        </div>
        <div className="form-container py-5 px-10">
          <div className="p-10 border boarder-grey bg-white">
            <div className="toast toast-top toast-end">
              <div className="alert alert-error rounded-none">
                <div>
                  <span>Message sent successfully.</span>
                </div>
              </div>
            </div>

            <div className="alert alert-warning shadow-lg rounded-none my-10">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Warning: Invalid email token della mamma!</span>
              </div>
            </div>

            <div className="form-control w-full ">
              <div className="flex ">
                <div className="w-1/5 ">
                  <label className="label justify-end ">
                    <span className="label-text mr-10">Configuration url</span>
                  </label>
                </div>
                <div className="w-4/5 ">
                  <input
                    type="text"
                    placeholder="configuration url"
                    className="input input-bordered w-full rounded-none "
                  />

                  <label className="label">
                    <span className="label-text-alt">Error section</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-control w-full ">
              <div className="flex ">
                <div className="w-1/5 ">
                  <label className="label justify-end ">
                    <span className="label-text mr-10">Strappy token</span>
                  </label>
                </div>
                <div className="w-4/5 ">
                  <input
                    type="text"
                    placeholder="Insert a valid strapi token"
                    className="input input-bordered w-full rounded-none "
                  />
                  <label className="label">
                    <span className="label-text-alt">Bottom Left label</span>
                    <span className="label-text-alt">Bottom Right label</span>
                  </label>
                </div>
              </div>
            </div>
            <button className="btn rounded-none">Save</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormMocked
