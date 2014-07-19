class Animal
      constructor: (name) ->
        @name = name
      sell0: ->
          "sell00000000000000"
      sell:(name)=>
        "Give me #{name} shillings!"
        #¾²Ì¬±äÁ¿
      @find:(name)->
          console.log(name)
          
          
module.exports = Animal;