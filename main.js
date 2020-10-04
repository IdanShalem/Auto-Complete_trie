const trie = new AutoCompleteTrie(' ')

trie.addWord('hello')
trie.addWord('hell')
trie.addWord('hey')
trie.addWord('running')
trie.addWord('runs')
trie.addWord('run')
trie.addWord('rush')

$('input').keyup(function(event){
    if(event.which === 13){
        trie.addWord($('input').val())
        $('input').val('')
    } else{
        const allWords = trie.predictWords($('input').val())
        if(allWords.length > 0){
            renderWords(allWords)
        } else{
            $('#auto-complete')
            .empty()
            .css('visibility', 'hidden')
        }
    }
})

const renderWords = function(allWords){
    const src = $('#auto-complete-template').html()
    const template = Handlebars.compile(src)
    const newHTML = template({allWords})
    $('#auto-complete')
        .empty()
        .append(newHTML)
        .css('visibility', 'visible')
}