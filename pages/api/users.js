import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('acts_gov')
      .select('*')
    
    if (error) return res.status(500).json({ error })
    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from('acts_gov')
      .insert([req.body])
    
    if (error) return res.status(500).json({ error })
    return res.status(201).json(data)
  }

  return res.status(405).json({ message: 'Method not allowed' })
}