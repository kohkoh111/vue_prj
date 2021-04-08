(function() {
    'use strict';
//two way binding(双方向バイディング→UIを更新するとデータも更新される)

var vm = new Vue({
    el: '#app',
    data: {
        newItem:'',
        todos:[],
    },
    watch:{
        // todos:function(){
            // localStorage.setItem('todos',JSON.stringify(this.todos));
            // alert('Data saved!');
        // }
        todos:{
            handler: function(){
                localStorage.setItem('todos',JSON.stringify(this.todos));
                // alert('data saved!');
            },
            deep:true,
        }
    },
    mounted:function(){
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
        addItem:function(){
            var item={
                title:this.newItem,
                isDone:false,
            };
            this.todos.push(item);
            this.newItem='';
        },
        deleteItem:function(index){
            if(confirm('Are you sure?')){
            this.todos.splice(index,1);
            }
        },
        purge:function(){
            if(!confirm('Delete done todos?')){
                return;
            }
            this.todos = this.remaining;
        }
    },
    computed:{
        remaining:function(){
            // var items = this.todos.filter(function(todos){
            //     return !todos.isDone;
            // });
            // return items.length;
            return this.todos.filter(function(todo){
                return !todo.isDone;
            });
        }
    }
  });
})();