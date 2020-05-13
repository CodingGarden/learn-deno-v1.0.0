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
        * Latest deno_mongo does not support v1!!!
      * [ ] Object Schema Validation
      * [ ] File watcher  
        * Couldnt get it working...
          * deno install --unstable --allow-read --allow-run -f https://deno.land/x/denon/denon.ts
  * [ ] POST /dinosaurs
    * Create a dinosaur
  * [ ] GET /dinosaurs
    * List all dinosaurs
  * [ ] PATCH /dinosaurs/:id
    * Update a dinosaur by id
  * [ ] DELETE /dinosaurs/:id
    * Delete a dinosaur by id