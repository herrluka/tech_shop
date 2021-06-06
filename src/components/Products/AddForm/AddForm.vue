<template>
    <form action="javascript:void(0);" class="col-xl-6 col-lg-6 col-md-6 col-12 jumbotron form-contorol m-0">
        Name:
        <input type="text" v-model="product.name" class="form-control" required/>
        Price:
        <input type="number" v-model="product.price" class="form-control" required/>
        Product Type:
        <select v-model="product.productType" class="form-control" required>           
            <option v-for="pt in productTypes" v-bind:key="pt.id" v-bind:value="pt">{{pt.name}}</option>
        </select>
        Image:
        <select @change="show" v-model="product.imageUrl" class="form-control" required>
            <option v-for="img in images" v-bind:key="img" v-bind:value="img">{{img}}</option>
        </select>
        <input type="submit" value="Save" class="btn btn-dark m-4" @click="addHandler"/>
        <input type="submit" value="Update" class="btn btn-dark m-4" @click="updateHandler"/>
    </form>
</template>
<script>
export default {
 name:"AddForm",
 props:['images','productTypes','changeImgHandler','product','handleAdd','handleUpdate'],
 methods:{
     show(){
         this.changeImgHandler(this.product.imageUrl);
     },
     addHandler(event){
        this.$store.dispatch("insertProduct",{name:this.product.name,price:this.product.price,imageUrl:this.product.imageUrl,productType:{
            id:this.product.productType.id,
            name:this.product.productType.name
        }});
     },
     updateHandler(event)
     {
         this.$store.dispatch("updateProduct",{id:this.product.id,name:this.product.name,price:this.product.price,imageUrl:this.product.imageUrl,productType:{
            id:this.product.productType.id,
            name:this.product.productType.name
        }});
     }
 }
}
</script>
