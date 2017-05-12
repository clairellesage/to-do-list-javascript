function add() {
	console.warn(event);
  const input = $('todo-input');
  // Emit the new todo as some data to the server
  server.emit('make', {
      title : input.value
  });
  // Clear the input
  input.value = '';
  // TODO: refocus the element
  input.focus();
}
