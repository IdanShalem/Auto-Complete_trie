class AutoCompleteTrie {

    constructor(val){
        this.value = val
        this.children = {}
        this.endOfWord = false
    }

    _addWordHelper(word){
        if(word.length === 1) {
            this.children[word[0]].endOfWord = true
        } else{
           this.children[word[0]].addWord(word.slice(1))  
        }
    }

    addWord(word){
        
        if(this.children[word[0]]){
            this._addWordHelper(word)
        } else {
            const newNode = new AutoCompleteTrie(word[0])
            this.children[word[0]] = newNode
            this._addWordHelper(word)
        }
    }

    findWord(word){
        if(word === '') {
            return true
        } 
        else if(this.children[word[0]]){
            return this.children[word[0]].findWord(word.slice(1))
        } else{
            return false
        }
    }

    predictWords(input){
        const node = this._getRemainingTree(input, this)
        const allWords = this._allWordsHelper(input, node, [])
        if(node && node.endOfWord){
            allWords.unshift(input)
        }
        return allWords
    }

    _getRemainingTree(input, node){
        if(input.length === 1){
            if(node.children[input[0]]){
                return node.children[input[0]]
            } 
        } else {
            if(node.children[input[0]]){
                return node.children[input[0]]._getRemainingTree(input.slice(1), node.children[input[0]])
            }
        }
    }

    _allWordsHelper(input, node, allWords){
        if(node){
            Object.keys(node.children).forEach(l => {
                let strToPass = input + node.children[l].value
                if(node.children[l].endOfWord){
                    allWords.push(strToPass)
                }
                node.children[l]._allWordsHelper(strToPass, node.children[l], allWords)
            })
        }
        return allWords
    }

}