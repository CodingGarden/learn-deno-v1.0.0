# Learning Deno v1.0.0 - Build a REST API - CRUD Dinosaurs

* [x] What is Deno?
* [x] Install Deno
* [x] Create a "Hello World"
* [ ] Build a REST API - CRUD Dinosaurs
  * [ ] Setup API
    * Determine what to use for:
      * [x] Web Framework
          * https://oakserver.github.io/oak/
        * [ ] Logger
        * [ ] CORS
      * [ ] Environment Variables
        * https://deno.land/x/dotenv/
      * [ ] MongoDB Driver
        * https://deno.land/x/mongo
      * [ ] Object Schema Validation
      * [ ] File watcher  
        * deno install --allow-read --allow-run --allow-write -f --unstable https://deno.land/x/denon/denon.ts
        * `denon init` to create denon.json config file. Create a [script](https://github.com/Oloro/deno-rest/blob/master/denon.json)
        * `denon` to list all scripts, `denon start` to run our server with fs watcher enabled
  * [ ] POST /dinosaurs
    * Create a dinosaur
  * [ ] GET /dinosaurs
    * List all dinosaurs
  * [ ] PATCH /dinosaurs/:id
    * Update a dinosaur by id
  * [ ] DELETE /dinosaurs/:id
    * Delete a dinosaur by id
