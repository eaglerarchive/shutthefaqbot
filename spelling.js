
// https://gist.github.com/andrei-m/982927

function levenshteinDistance(a, b){
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}

const correctSpelling = [
	"how", "do", "does", "can", "you", "make", "server", "private", "my", "an", "own", "host", "this", "the",
	"why", "can't", "create", "install", "local", "join", "creative", "survival", "demo", "doesn't", "work",
	"log", "in", "game", "down", "is", "time", "out", "won't", "use", "site", "website", "g.eags.us", "eagler",
	"eaglercraft", "minecraft", "mine", "craft", "client", "java", "i", "fuck", "off", "of", "link", "url",
	"cant", "doesnt", "wont", "need", "probably", "guys", "will", "update", "it", "come", "coming", "new", "soon",
	"upgrade", "connect", "g.eags.us/eaglercraft", "https://g.eags.us/eaglercraft", "https://g.eags.us", "load",
	"download", "upload", "login", "profile", "user", "username", "up", "start", "stop", "someone", "somebody",
	"world", "fail", "online", "offline", "broken", "crashed", "updated", "updating", "a", "latest", "be", "to",
	"newer", "of", "what", "modern", "that", "there", "doesn't", "all", "not", "happen", "correctly", "possible",
	"isnt", "vanilla", "for", "get", "help", "me", "trying", "add", "where", "no", "assist", "<@237080395747819520>",
  "<@214118574485143553>", "yall", "y'all"
];

module.exports = {
	correctTheGoddamnSpelling: function(txtIn, tolerance) {
    txtIn = txtIn.trim();
		var words = txtIn.split(" ");
		var wordsOut = "";
		for(var i = 0; i < words.length; ++i) {
			if(words[i].length == 0) {
				continue;
			}
			
			if(words[i].endsWith(".") || words[i].endsWith(",") || words[i].endsWith("?") || words[i].endsWith("!")) {
				if(words[i].length < 2) {
					continue;
				}
				words[i] = words[i].substring(0, words[i].length - 1);
			}
			
			words[i] = words[i].toLowerCase();
			
			var best = -1;
			var bestBest = tolerance + 1;
			
			for(var j = 0; j < correctSpelling.length; ++j) {
				var testing = correctSpelling[j];
				if(words[i] === testing || words[i] === testing + "s" || words[i] === testing + "ing") {
					best = j;
					break;
				}
			}
			
			if(best != -1) {
				wordsOut += words[i].replace("'", "").replace("\"", "") + " ";
				continue;
			}
			
			for(var j = 0; j < correctSpelling.length; ++j) {
				var testing = correctSpelling[j];
				if(Math.abs(words[i].length - testing.length) < tolerance - 1) {
					var err = levenshteinDistance(words[i], testing);
					if(err <= tolerance && err < bestBest) {
						best = j;
						bestBest = err;
					}
				}
			}
			
			wordsOut += (best == -1 ? words[i] : correctSpelling[best]).replace("'", "").replace("\"", "") + " ";
		}
		return wordsOut.trim();
	}
};