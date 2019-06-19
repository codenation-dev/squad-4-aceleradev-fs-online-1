package util

import (
	"crypto/sha1"
	"encoding/hex"
)

func EncriptToSha1(bytes []byte) string{
	hasher := sha1.New()
	hasher.Write(bytes)
	return hex.EncodeToString(hasher.Sum(nil))
}
