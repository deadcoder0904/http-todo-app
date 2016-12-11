$(document).ready(function() {
	const BASE = 'https://http-todo-app-0904.herokuapp.com';

	function getTodos() {
		let item;
		fetch(`${BASE}/todos`, {mode: 'cors'}).then(res => res.json()).then(todos => {
			if(todos.length != 0) {
				for(let todo of todos) {
					item = "<div class='f2 gray tc pointer ph4'> <span class='todos'>" + todo + " </span><i class='pr2 f5 em em-heavy_multiplication_x close'></i> </div>"
					$('#app').append(item);
				}
			}
		});
	}

	function addTodo(el,text) {
		fetch(`${BASE}/todos`, {
	    method: 'post',
	    headers: {
	      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	    },
	    body: `name=${text}`
	  })
	  .then(res => res.json())
	  .then(data => {
	    todo = "<div class='f2 gray tc pointer ph4'> <span class='todos'>" + data[data.length - 1] + " </span><i class='pr2 f5 em em-heavy_multiplication_x close'></i> </div>";
			el.append(todo);
	  });
	}

	function completedTodo(el) {
		el.toggleClass('strike');
	}

	function deleteTodo(el) {
		const val = el[0].children[0];

		fetch(`${BASE}/todos`, {
	    method: 'delete',
	    headers: {
	      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	    },
	    body: `name=${val.innerHTML.trim()}`
	  });

		el.remove();
	}

	getTodos();

	var submit = $("form[name='todo-form']");

	submit.on("submit",function(e) {
		e.preventDefault();
		value = $("input[name='todo-item']");
		if(value.val() !== "") {
				addTodo($("#app"),value.val());
				value.val("");
			}
	});

	$("#app").on('click','.todos',function() {
		completedTodo($(this));
	});

	$("#app").on('click','.close',function() {
		deleteTodo($(this).parent());
	});

});
