// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import mock "github.com/stretchr/testify/mock"
import user "github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/user"

// Repository is an autogenerated mock type for the Repository type
type Repository struct {
	mock.Mock
}

// FindByUsername provides a mock function with given fields: email
func (_m *Repository) FindByUsername(email string) (*user.User, error) {
	ret := _m.Called(email)

	var r0 *user.User
	if rf, ok := ret.Get(0).(func(string) *user.User); ok {
		r0 = rf(email)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*user.User)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(string) error); ok {
		r1 = rf(email)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Save provides a mock function with given fields: usuario
func (_m *Repository) Save(usuario *user.User) error {
	ret := _m.Called(usuario)

	var r0 error
	if rf, ok := ret.Get(0).(func(*user.User) error); ok {
		r0 = rf(usuario)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// Update provides a mock function with given fields: usuario
func (_m *Repository) Update(usuario *user.User) error {
	ret := _m.Called(usuario)

	var r0 error
	if rf, ok := ret.Get(0).(func(*user.User) error); ok {
		r0 = rf(usuario)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}
