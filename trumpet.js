var fs = require('fs')

var trumpet = {
    starters: [],
    terminators: [],
    dictionary: {},

    parse: function(file){
        var file = fs.readFileSync(file, 'utf-8')

        var text = file.replace(/\s+/g, ' ')
        text = text.replace(/\.\s/g, '.@END')
        text = text.replace(/\?\s/g, '?@END')
        text = text.replace(/\!\s/g, '!@END')

        var lines = text.split('@END')

        lines.forEach(line =>{
            var tokens = line.split(' ')
            if (tokens.length < 3){
                return
            }

            this.starters.push(tokens.slice(0, 2).join(' '))
            this.terminators.push(tokens[(tokens.length - 1)])

            for (var i = 0; i < tokens.length - 2; i++){
                var prefix = tokens.slice(i, i + 2).join(' ')
                var suffix = tokens[i + 2]
                this.dictionary[prefix] = this.dictionary[prefix] || []
                this.dictionary[prefix].push(suffix)
            }
        })        
    },

    chain: function(){
        var chain = []
        var starter = this.starters[Math.floor(Math.random() * (this.starters.length - 1))].split(' ')
        chain.push(starter[0])
        chain.push(starter[1])
        var suffix
        var i = 0

        while (this.terminators.indexOf(suffix) === -1){
            var prefix = chain.slice(i, i + 2).join(' ')
            var suffixes = this.dictionary[prefix]
            suffix = suffixes[Math.floor(Math.random() * (suffixes.length - 1))]
            chain.push(suffix)
            i++
        }

        return chain.join(' ')
    },

    fill: function(lines){
        var text = []
        for (var i = 0; i < lines; i++){
            text.push(this.chain())
        }
        return text.join(' ')
    }
}

module.exports = trumpet