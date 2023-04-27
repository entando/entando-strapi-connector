import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { App } from "./App"

describe("App", () => {
  it("should render", () => {
    render(
      <App
        config={{
          systemParams: {
            api: {
              "strapi-config-microservice": {
                url: "www.example.org"
              }
            }
          }
        }}
      />
    )

    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Job")).toBeInTheDocument()
  })
})
