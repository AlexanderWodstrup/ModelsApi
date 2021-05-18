<template>
    <div class="CreateModelForm">
        <h1>Enter Model Information</h1>
        <form v-on:submit.prevent="create">
            <div class="field">
                <label class="label">Firstname</label>
                <div class="control">
                    <input v-model="form.FirstName"
                           class="input"
                           type="text"
                           placeholder="Firstname" />
                </div>
            </div>
            <div class="field">
                <label class="label">Lastname</label>
                <div class="control">
                    <input v-model="form.LastName"
                           class="input"
                           type="text"
                           placeholder="Lastname" />
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input v-model="form.Email"
                           class="input"
                           type="text"
                           placeholder="Email" />
                </div>
            </div>
            <div class="field">
                <label class="label">Phone number</label>
                <div class="control">
                    <input v-model="form.PhoneNo"
                           class="input"
                           type="text"
                           placeholder="Phone number" />
                </div>
            </div>
            <div class="field">
                <label class="label">AddresLine1</label>
                <div class="control">
                    <input v-model="form.AddresLine1"
                           class="input"
                           type="text"
                           placeholder="AddresLine1" />
                </div>
            </div>
            <div class="field">
                <label class="label">AddresLine2</label>
                <div class="control">
                    <input v-model="form.AddresLine2"
                           class="input"
                           type="text"
                           placeholder="AddresLine2" />
                </div>
            </div>
            <div class="field">
                <label class="label">Zip code</label>
                <div class="control">
                    <input v-model="form.Zip"
                           class="input"
                           type="text"
                           placeholder="Zip code" />
                </div>
            </div>
            <div class="field">
                <label class="label">City</label>
                <div class="control">
                    <input v-model="form.City"
                           class="input"
                           type="text"
                           placeholder="City" />
                </div>
            </div>
            <div class="field">
                <label class="label">Contry</label>
                <div class="control">
                    <input v-model="form.Contry"
                           class="input"
                           type="text"
                           placeholder="Contry" />
                </div>
            </div>
            <div class="field">
                <label class="label">BirthDate</label>
                <div class="control">
                    <input v-model="form.BirthDate"
                           class="input"
                           type="text"
                           placeholder="BirthDate" />
                </div>
            </div>
            <div class="field">
                <label class="label">Nationality</label>
                <div class="control">
                    <input v-model="form.Nationality"
                           class="input"
                           type="text"
                           placeholder="Nationality" />
                </div>
            </div>
            <!--<div class="field">
                <label class="label">Height</label>
                <div class="control">
                    <input v-model="form.Height"
                           class="input"
                           type="number"
                           placeholder="Height" />
                </div>
            </div>-->
            <!--<div class="field">
                <label class="label">ShoeSize</label>
                <div class="control">
                    <input v-model="form.ShoeSize"
                           class="input"
                           type="number"
                           placeholder="ShoeSize" />
                </div>
            </div>-->
            <div class="field">
                <label class="label">HairColor</label>
                <div class="control">
                    <input v-model="form.HairColor"
                           class="input"
                           type="text"
                           placeholder="HairColor" />
                </div>
            </div>
            <div class="field">
                <label class="label">EyeColor</label>
                <div class="control">
                    <input v-model="form.EyeColor"
                           class="input"
                           type="text"
                           placeholder="EyeColor" />
                </div>
            </div>
            <div class="field">
                <label class="label">Comments</label>
                <div class="control">
                    <input v-model="form.Comments"
                           class="input"
                           type="text"
                           placeholder="Comments" />
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input v-model="form.Password"
                           class="input"
                           type="text"
                           placeholder="Password" />
                </div>
            </div>
            <div class="control">
                <button class="button is-primary">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "createmodel",
        data: function () {
            return {
                form: {
                    firstName: "string",
                    lastName: "string",
                    email: "string",
                    phoneNo: "string",
                    addresLine1: "string",
                    addresLine2: "string",
                    zip: "string",
                    city: "string",
                    country: "string",
                    birthDate: "2021-05-18T14:46:34.626Z",
                    nationality: "string",
                    //height: "decimal",
                    //shoeSize: 0,
                    hairColor: "string",
                    eyeColor: "string",
                    comments: "string",
                    password: "string"
                },
                credentials: {},
                jobs: []
            };
        },
        methods: {
            async create() {
                let url = "https://localhost:44368/api/Models";
                try {
                    let response = await fetch(url, {
                        method: "POST",
                        body: JSON.stringify(this.form),
                        credentials: "include",
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                            "Content-Type": "application/json"
                        }
                    });

                    if (response.ok) {
                        alert("Model created");
                    } else {
                        alert("model not created: " + response.statusText + " token:  " + localStorage.getItem("token"));
                    }
                } catch (err) {
                    alert("Error: " + err);
                }
            }
        }
    };
</script>

<style scoped>

</style>