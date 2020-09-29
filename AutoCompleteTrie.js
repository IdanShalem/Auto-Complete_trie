class AutoCompleteTrie {

    constructor(val){
        this.value = val
        this.children = {}
        this.enfOfWord = false
    }

    addWord(word){
        if(this.children[word[0]]){
            if(word.length === 1) {
                this.children[word[0]].enfOfWord = true
            } else{
               this.children[word[0]].addWord(word.slice(1))  
            }
        } else {
            const newNode = new AutoCompleteTrie(word[0])
            this.children[word[0]] = newNode
            if(word.length === 1) {
                this.children[word[0]].enfOfWord = true
            } else {
                this.children[word[0]].addWord(word.slice(1))
            }
        }
    }

}

const trie = new AutoCompleteTrie(' ')

trie.addWord('hello')
trie.addWord('run')
trie.addWord('running')
trie.addWord('rush')
console.log(trie.children['r'].children['u'].children['s'])