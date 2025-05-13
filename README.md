# Containerized Node Server and HTMX Demonstration

This repository is a practice space for exploring node.js at a lower level. I've found myself focusing too much on libaries and while they're useful, I feel a need for a playground where I can experiment with nodejs using it's core modules as much as possible.

I'm also increasingly needing to develop my skills and understanding of devops and app scalability. So for that I'm going to also include a Containerfile that can scale to add to a [Podman Pod](https://docs.podman.io/en/latest/markdown/podman-pod.1.html) (or [podman-compose](https://docs.podman.io/en/latest/markdown/podman-compose.1.html)). 

Another topic that I learned I need to familiarize with is unit testing. So I've added [mocha](https://mochajs.org/) based on it being light and stable. I'm especially excited to come up with security and performance unit tests.

Finally, for rendering content, I wanted to take some time to experiment with something new here. I didn't want to use just js for rendering content and I've been curious of [HTMX](https://htmx.org/) for a while. So to keep my focus on the backend logic and not get crazy with the frontend, it is valuable to me to learn a more static view management layer to accent my work with more powerful frameworks (which I'm ecited to explore in a seperate project akin to this one in spirit).

## Getting Started

- **Installation**: `npm install`
- **Start Server**: `npm serve`
- **Run Tests**: `npm test`
- **TODO**: Add container instructions

## Technical Documentation
- [node.js v22](https://nodejs.org/docs/latest-v22.x/api/index.html)
- [podman](https://podman.io/)
- [htmx](https://htmx.org/)
- [mocha](https://mochajs.org/)
