import './style.css'


async function getData(url = 'https://jsonplaceholder.typicode.com/posts/1/comments', data = {}) {
  return fetch(url, { method: 'GET', headers: { "Content-Type": "application/json", 'x-test': 'bar' } })
}

function render(response) {
  const main = document.querySelector('.Main')


  // sort by average review length
  // sum / how many reviews
  // Absolute number of no negative
  // response.length

  const sum = response.reduce((acc, curr) => acc + curr.body.length, 0)
  const sorted = response.sort((a, b) => {
    return Math.abs(sum / a.body) - Math.abs(sum / b.body)
  })


  for (let i = 0; i < sorted.length; i++) {
    // backwards
    // for (let i = response.length - 1; i > 0; i--) {
    const { email, name, body } = sorted[i]
    const listItem = document.createElement('li')

    listItem.innerHTML = `<div><h3>${name} - ${email}</h3>${body}</div>`
    main.appendChild(listItem)
  }

}

async function main() {
  try {
    const data = await getData()
    // If you see response, we need to .json() that!
    const response = await data.json()
    render(response)
  } catch (e) {
    console.log('There was an error retrieving data:', e)
  }
}





document.querySelector('#app').innerHTML = `
  <ul class="Main"></ul>
`

main()

