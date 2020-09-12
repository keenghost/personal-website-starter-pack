import bcrypt from 'bcrypt'

export function generateCipher(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err: Error, hash: string) => {
      if (err) {
        reject(err)
        return
      }

      resolve(hash)
    })
  })
}

export function compareCipher(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err: Error, result: boolean) => {
      if (err) {
        reject(err)
        return
      }

      resolve(result)
    })
  })
}
